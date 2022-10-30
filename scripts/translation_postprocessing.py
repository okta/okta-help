#!/usr/bin/env python3

"""Translation Post-processing

(c) 2022 Okta, Inc.
Author: Paul Wallace (paul.wallace@okta.com)

Returned translations of HTML content require post-processing prior to
deployment. There are a number of string segments that are not currently
picked up in XTM, and thus are returned untranslated. 
These segments include:

* Attribute values (such as aria-labels)
* URL fragements for locale-specific paths (such as `/en-us/`
* URL query parameters for language (such as `?language=en_US`) 

This script can be used to execute a search-and-replace of these segments. 

The segments that require fixing are maintained in an accompanying
JSON file (`en2ja.json`). String replacement pairs can be revised or added 
therein. If in future we need to support additional languages, we can 
add similar files for those, which can be sent to translation
if necessary.

This script uses modules from the Python Standard Library only. It should
run successfully on any machine that has Python3 installed, without 
need to fetch additional packages.

This script is accompanied by unit tests. To run the tests:

        $ cd okta-help
        $ python3 scripts/test_translation_postprocessing.py

"""

import argparse
import json
import os
import re
import subprocess
import sys


# Error messages
invalid_dir = "'%s' is not a valid directory path."
invalid_file = "'%s' is not a valid file path."
invalid_json = "'%s' is not a valid JSON file."
missing_properties = "JSON data does not contain expected properties."
not_a_lang_locale_dir = "'%s' is not a valid lang-locale directory."

# Lang-locale directory names generally follow the ISO 639-1 and ISO 3166-1
# naming conventions for lang and locale, respectively (for example, 'ja-jp').
# The codes will be applied in all lowercase.
# However, for Latin America/Caribbean Spanish, the UN M49 code could be used 
# in place of ISO 3166-1 ('es-419').
lang_locale_dir = re.compile(r'[a-z]{2}-(?:[a-z]{2}|419)')


def validate(lang_dir):
    """Returns `lang_pdir` path for valid target lang directories."""
    if not os.path.isdir(lang_dir):
        raise TranslationPostProcessingException(invalid_dir % lang_dir)
    base_dir = os.path.basename(lang_dir)
    if not re.match(lang_locale_dir, base_dir):
        raise TranslationPostProcessingException(not_a_lang_locale_dir % lang_dir)
    return lang_dir
   
def load_pairs(pairs_file):
    """Returns search/replace pairs from pairs_file"""
    data = _load_json(pairs_file)
    try:
        pairs = data['pairs']
    except KeyError:
        raise TranslationPostProcessingException(missing_properties)
    return pairs

def _load_json(pairs_file):
    if not os.path.isfile(pairs_file):
        raise TranslationPostProcessingException(invalid_file % pairs_file)
    with open(pairs_file, 'r') as f:
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            raise TranslationPostProcessingException(invalid_json % pairs_file)
    return data

def search_and_replace(text, pair):
    """Returns `text` with any instances of `from` val replaced with `to`."""
    try:
        from_ = pair['from']
        to_ = pair['to']
    except KeyError:
        raise TranslationPostProcessingException(missing_properties)
    if from_ in text:
        text = text.replace(from_, to_)
    return text

def apply_replacements(lang_dir, pairs):
    """Walk the dir tree from `lang_dir`, applying string replacements
       for each pair in `pairs`.
    """
    for root, dirs, files in os.walk(lang_dir):
        for file in files:
            if file.endswith('.htm'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    text = f.read()
                for pair in pairs:
                    revised_text = search_and_replace(text, pair)
                if revised_text != text:
                    with open(path, 'w') as w:
                        w.write(revised_text)

def main(lang_dir, pairs_file):
    lang_dir = validate(lang_dir)
    replacement_pairs = load_pairs(pairs_file)
    apply_replacements(lang_dir, replacement_pairs)


class TranslationPostProcessingException(Exception):
    def __init__(self, msg):
        self.msg = msg


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="""\
    Apply string replacements for search/replace pairs in 'pairs_file'
    to all HTML files within 'lang_dir'.
    """)
    parser.add_argument("lang_dir",
                help="Target language directory (e.g., `asa/ja-jp`)")
    parser.add_argument("pairs_file",
                help="JSON file containing search/replace string pairs")
    args = parser.parse_args()

    main(args.lang_dir, args.pairs_file)

#!/usr/bin/env python3

"""Translation Post-processing

(c) 2022 Okta, Inc.
Author: Paul Wallace (paul.wallace@okta.com)

Returned translations of HTML content require post-processing prior to 
deployment.

* Attribute values
* URL fragements for locale-specific paths
* URL query parameters for language




"""

import argparse
import json
import os
import re


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


def validate(topdir):
    """
    
    """
    if not os.path.isdir(topdir):
        raise TranslationPostProcessingException(invalid_dir % topdir)
    base_dir = os.path.basename(topdir)
    if not re.match(lang_locale_dir, base_dir):
        raise TranslationPostProcessingException(not_a_lang_locale_dir % topdir)
    return topdir
   
def load_pairs(termfile):
    data = _load_json(termfile)
    try:
        pairs = data['pairs']
    except KeyError:
        raise TranslationPostProcessingException(missing_properties)
    return pairs

def _load_json(termfile):
    if not os.path.isfile(termfile):
        raise TranslationPostProcessingException(invalid_file % termfile)
    with open(termfile, 'r') as f:
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            raise TranslationPostProcessingException(invalid_json % termfile)
    return data

def search_and_replace(text, pair):
    try:
        from_ = pair['from']
        to_ = pair['to']
    except KeyError:
        raise TranslationPostProcessingException(missing_properties)
    if from_ in text:
        text = text.replace(from_, to_)
    return text


def apply_replacements(dir, pairs):
    for root, dirs, files in os.walk(dir):
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


def main(topdir, termfile):

    lang_dir = validate(topdir)
    replacement_pairs = load_pairs(termfile)
    apply_replacements(lang_dir, replacement_pairs)




class TranslationPostProcessingException(Exception):
    def __init__(self, msg):
        self.msg = msg


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="")
    
    parser.add_argument()
    
        
    parser.parse_args()
    main(topdir=topdir, termfile=termfile)

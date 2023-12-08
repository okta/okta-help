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
therein. If in future we need to support additional languages, we can add
JSON files for those. In that event, we will also refactor this script --
possibly to pass in the `pub/lang` dir as the sole argument,
and handle string replacement JSON file selection in the background.

This script uses modules from the Python Standard Library only. It should
run successfully on any machine that has Python3 installed, without
need to fetch additional packages.

To run script and pass target name as a parameter:

        $ cd okta-help
        $ python3 scripts/translation_postprocessing.py asa

This script is accompanied by unit tests. To run the tests:

        $ cd okta-help
        $ python3 scripts/test_translation_postprocessing.py

"""


import argparse
import json
import os
import re
import shutil

# Error messages
invalid_target = "'%s' is not a valid target."
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
pairs_file = 'scripts/en2ja.json'
targets = ['oie', 'oce', 'eu', 'wf', 'oag', 'asa']
ja_jp = 'ja-jp'
en_us = 'en-us'

def get_lang_dir(target):
    if target not in targets:
        raise TranslationPostProcessingException(invalid_target % target)

    lang_dir = ja_jp if target == 'oce' else target + '/' + ja_jp;

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
    with open(pairs_file, 'r', encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            raise TranslationPostProcessingException(invalid_json % pairs_file)
    return data

def apply_replacements(pairs, text):
    for pair in pairs:
        text = search_and_replace(text, pair)
    return text

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

def walk(lang_dir, pairs):
    """Walk the dir tree from `lang_dir`, applying string replacements
       for each pair in `pairs`.
    """
    for root, dirs, files in os.walk(lang_dir):
        for file in files:
            if file.endswith('.htm') or file.endswith('.xml'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding="utf-8") as f:
                    text = f.read()
                revised_text = apply_replacements(pairs, text)
                if revised_text != text:
                    with open(path, 'w', encoding="utf-8") as w:
                        w.write(revised_text)

def replace_strings(target, pairs_file):
    lang_dir = get_lang_dir(target)
    replacement_pairs = load_pairs(pairs_file)
    walk(lang_dir, replacement_pairs)

def restore_release_notes(target):
    """ Restores release notes to their original location """
    base_path = en_us if target == 'oce' else target + '/' + en_us;
    release_notes_backup = base_path + '/ReleaseNotes'
    release_notes = base_path + '/Content/Topics'
    if os.path.isdir(release_notes_backup):
        shutil.move(release_notes_backup, release_notes)

def remove_stale_files(lang_dir, sitemap_files):
    """Walk the dir tree from `lang_dir`, deletes files which are not included
       into sitemap.
    """
    files_for_deletion = []
    base_to_remove = lang_dir + '/content/topics/'
    release_notes_path = base_to_remove + 'releasenotes/'

    for root, dirs, files in os.walk(lang_dir):
        for file in files:
            if not file.endswith('.htm'):
                continue

            path = os.path.join(root, file)

            if not path.startswith(base_to_remove):
                continue

            sitemap_file = path.replace(base_to_remove, '')
            if not sitemap_file in sitemap_files:
                if path.startswith(release_notes_path):
                    print("skip rel notes:", sitemap_file)
                    continue
                print("delete stale:", sitemap_file)
                files_for_deletion.append(path)

    for file in files_for_deletion:
        os.remove(file)

def get_sitemap_files(sitemap_path):
    matches = []

    file_path_regex = "/en-us/content/topics/(.*htm)</loc>"
    regexp = re.compile(file_path_regex)
    with open (sitemap_path, 'r') as sitemap:
        for line in sitemap:
            matches += regexp.findall(line)

    return matches

def sync_files_with_en_folder(target):
    """ Synchronizes file structure in translated folder with english folder.
        Is required for removing stale files in ja-jp folder.
    """
    sitemap_path = en_us if target == 'oce' else target + '/' + en_us
    sitemap_path += '/Sitemap.xml'
    sitemap_files = get_sitemap_files(sitemap_path)

    lang_dir = get_lang_dir(target)

    remove_stale_files(lang_dir, sitemap_files)

def main(target, pairs_file):
    if target not in targets:
        raise TranslationPostProcessingException(invalid_target % target)

    replace_strings(target, pairs_file)
    restore_release_notes(target)
    sync_files_with_en_folder(target)

class TranslationPostProcessingException(Exception):
    def __init__(self, msg):
        self.msg = msg

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="""\
    Apply string replacements for search/replace pairs in 'pairs_file'
    to all HTML files for target.
    """)
    parser.add_argument(
        "target",
        help="[asa|oag|oie|oce|wf|eu]")
    parser.add_argument(
        'pairs_file',
        help='JSON file containing search/replace string pairs',
        nargs='?',
        default=pairs_file)

    args = parser.parse_args()

    main(args.target, args.pairs_file)

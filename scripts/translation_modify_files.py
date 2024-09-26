#!/usr/bin/env python3

"""Translation Modify Files
Appends a whitespace to every htm in en-us folder for specified product.
Can be useful when we want to run all english files through XTM translation
memory.

$ cd okta-help
$ python3 scripts/translation_modify_files.py asa

"""

import argparse
import os

targets = ['oie', 'oce', 'eu', 'wf', 'oag', 'asa', 'ispm']
EN_US = 'en-us'

def main(target):
    if target not in targets:
        print(f'Target [{target}] does not exist')

    en_dir = EN_US if target == 'oce' else target + '/' + EN_US;

    for root, dirs, files in os.walk(en_dir):
        for file in files:
            if file.endswith('.htm'):
                file_path = os.path.join(root, file)
                with open(file_path, 'a', encoding="utf-8") as file:
                    file.write(' ');

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="""\
    Apply string replacements for search/replace pairs in 'pairs_file'
    to all HTML files for target.
    """)
    parser.add_argument(
        "target",
        help="[asa|oag|oie|oce|wf|eu|ispm]")

    args = parser.parse_args()

    main(args.target)

#!/usr/bin/env python3

import argparse
import json
import os
from xmlrpc.client import Transport

from scripts.test_translation_postprocessing import TestTranslationPostProcessing


invalid_json = "'%s' is not a valid JSON file."
missing_properties = "JSON data does not contain expected properties."
invalid_dir = "'%s' is not a valid directory."
file_not_found = "'%s' is not a valid file."


def _load_json(termfile):
    if not os.path.isfile(termfile):
        raise TranslationPostProcessingException(file_not_found % termfile)
    with open(termfile, 'r') as f:
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            raise TranslationPostProcessingException(invalid_json % termfile)
        else:
            return data


def parse(text, termfile):
    data = _load_json(termfile)
    try:
        pairs = data['pairs']
    except KeyError:
        raise TranslationPostProcessingException(missing_properties) 
    else:
        changed = False
        for pair in pairs:
            revised_text = search_and_replace(text, pair)
            if revised_text:
                changed = True



def search_and_replace(text, pair):
    changed = False
    try:
        from_ = pair['from']
        to_ = pair['to']
    except KeyError:
        raise TranslationPostProcessingException(missing_properties)     
    else:
        if from_ in text:
            revised_text = text.replace(from_, to_)
    return revised_text if changed else None


def run(topdir, termfile):

    if not os.path.isdir(topdir):
        raise TranslationPostProcessingException(invalid_dir % topdir)

    data = load_json(termfile)

    for root, dirs, files in os.walk(topdir):
        for file in files:
            if file.endswith('.htm'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    text = f.read()
                revised_text = search_and_replace(text, data)
                if revised_text:
                    with open(path, 'w') as w:
                        w.write(revised_text)


class TranslationPostProcessingException(Exception):
    def __init__(self, msg):
        self.msg = msg


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="")
    
    parser.add_argument()
    
        
    parser.parse_args()
    run(topdir=topdir, termfile=termfile)

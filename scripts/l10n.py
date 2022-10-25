#!/usr/bin/env python3

import argparse
import json
import os


def _load_json(termfile):
    with open(termfile, 'r') as f:
        try:
            data = json.load(f)
            pairs = data['pairs']
        except json.decoder.JSONDecodeError:
            raise L10nException("'%s' is not a valid JSON file." % termfile)
        except KeyError:
            raise L10nException("'%s' does not contain a 'pairs' property." % termfile)
        else:
            return pairs



def run(topdir, termfile):
    pairs = _load_json(termfile)

    for root, dirs, files in os.walk(topdir):
        for file in files:
            if file.endswith('.htm'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    text = f.read()
                changed = False
                for pair in pairs:
                    if pair['from'] in text:
                        changed = True
                        text = text.replace(pair['from'], pair['to'])
                if changed:
                    with open(path, 'w') as w:
                        w.write(text)


class L10nException():
    def __init__(self, msg):
        self.msg = msg


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="")
    
    parser.add_argument()
    
        
    parser.parse_args()
    run(topdir=topdir, termfile=termfile)

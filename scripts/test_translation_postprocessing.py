#!/usr/bin/env python3

from io import StringIO
import os.path
import unittest
from unittest import mock 

import translation_postprocessing as tpp


class TestTranslationPostProcessing(unittest.TestCase):

    def test_replace_from_val_with_to_val(self):
        text = "I am this close."
        pairs = [{"from": "this", "to": "that"}]
        expected = "I am that close."
        result = tpp.search_and_replace(text, pairs)
        self.assertEqual(result, expected)

    def test_do_nothing_for_no_matches(self):
        text = "I am this close."
        pairs = [{"from": "here", "to": "eternity"}]
        expected = None
        result = tpp.search_and_replace(text, pairs)
        self.assertEqual(result, expected)

    def test_raise_for_missing_properties(self):
        text = "I am this close."
        pairs = [{"this": 1, "that": 2}]
        with self.assertRaises(tpp.TranslationPostProcessingException, 
                               msg=tpp.missing_properties):
            tpp.search_and_replace(text, pairs)
    
    def test_load_lang_pairs(self):
        pairs = tpp.load_lang_pairs('scripts/en2ja.json')
        for pair in pairs:
            assert 'from' in pair.keys()
            assert 'to' in pair.keys()

    def test_load_lang_pairs_raises_for_bad_file(self):
        with self.assertRaises(tpp.TranslationPostProcessingException, 
                               msg=(tpp.invalid_json % 'test_translation_postprocessing.py')):
            pairs = tpp.load_lang_pairs('scripts/test_translation_postprocessing.py')        

    def test_load_pairs_raises_for_missing_file(self):
        with self.assertRaises(tpp.TranslationPostProcessingException, 
                               msg=(tpp.file_not_found % 'file.json')):
            pairs = tpp.load_lang_pairs('file.json')
        




if __name__ == '__main__':
    unittest.main()

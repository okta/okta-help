#!/usr/bin/env python3

import os.path
import unittest
from unittest import mock

import translation_postprocessing as tpp


class TestTranslationPostProcessing(unittest.TestCase):

    def test_search_and_replace_replaces_from_str_with_to_str(self):
        text = "I am this close."
        pairs = {"from": "this", "to": "that"}
        expected = "I am that close."
        result = tpp.search_and_replace(text, pairs)
        assert result == expected

    def test_search_and_replace_returns_unchanged_str_for_no_match(self):
        text = "I am this close."
        pair = {"from": "here", "to": "eternity"}
        expected = text
        result = tpp.search_and_replace(text, pair)
        assert result == expected

    def test_apply_replacements_for_strings_found_in_text(self):
        text = "We are this close to here."
        pairs = [{'from': 'this', 'to': 'that'},
                 {'from': 'here', 'to': 'eternity'},
                 {'from': 'nothing', 'to': 'something'}]
        expected = "We are that close to eternity."
        result = tpp.apply_replacements(pairs, text)
        assert result == expected

    @mock.patch('translation_postprocessing._load_json')
    def test_raise_for_missing_pairs_property(self, mock_load_json):
        # Using 'couplets' as a prop name in place of 'pairs'
        mock_load_json.return_value = dict(couplets=[{'from': 'here', 'to': 'eternity'}])
        message = "JSON data does not contain expected properties."
        with self.assertRaises(tpp.TranslationPostProcessingException,
                                msg=message) as e:
            pairs = tpp.load_pairs('somefile.json')
        assert str(e.exception) == message

    def test_raise_for_missing_from_and_to_properties(self):
        text = "I am this close."
        pair1 = {"old": "this", "to": "that"}
        pair2 = {"from": "this", "new": "that"}
        pair3 = {"old": "this", "new": "that"}
        message = "JSON data does not contain expected properties."
        for pair in [pair1, pair2, pair3]:
            with self.assertRaises(tpp.TranslationPostProcessingException,
                                   msg=message) as e:
                tpp.search_and_replace(text, pair)
            assert str(e.exception) == message

    def test_load_pairs_returns_pairs_from_pairs_file_data(self):
        pairs = tpp.load_pairs('scripts/en2ja.json')
        # The num of pairs can change over time, thus the GTE assertion
        assert len(pairs) >= 16
        for pair in pairs:
            assert 'from' in pair.keys()
            assert 'to' in pair.keys()

    def test_load_pairs_raises_for_wrong_file_type(self):
        filename = 'README.md'
        message = "'README.md' is not a valid JSON file."
        with self.assertRaises(tpp.TranslationPostProcessingException,
                               msg=message) as e:
            data = tpp.load_pairs(filename)
        assert str(e.exception) == message

    def test_load_pairs_raises_for_nonexistent_file(self):
        filename = 'fake.json'
        message = "'fake.json' is not a valid file path."
        with self.assertRaises(tpp.TranslationPostProcessingException,
                               msg=message) as e:
            data = tpp.load_pairs(filename)
        assert str(e.exception) == message

    def test_get_lang_dir_returns_dirname_for_existing_target(self):
        lang_dir = tpp.get_lang_dir('asa')
        self.assertEqual(lang_dir, 'asa/ja-jp')

    def test_get_lang_dir_returns_dirname_for_oce(self):
        lang_dir = tpp.get_lang_dir('oce')
        self.assertEqual(lang_dir, 'ja-jp')

    def test_get_lang_dir_raises_for_bad_target_name(self):
        message="'foo' is not a valid target."
        with self.assertRaises(tpp.TranslationPostProcessingException,
                               msg=message) as e:
            lang_dir = tpp.get_lang_dir('foo')

        assert str(e.exception) == message, e.exception

if __name__ == '__main__':
    unittest.main()

#!/usr/bin/env python3

# To create redirect files from stored map run
# cd okta-help
# python3 scripts/redirect_url_utils.py apply_map
# or simply
# python3 scripts/redirect_url_utils.py
#
# To update file paths to redirect urls map run
# cd okta-help
# python3 scripts/redirect_url_utils.py save_map

import os
import re
import argparse
import csv

FILE_TO_URL = 'scripts/file_to_url.txt'
REDIRECT_FILE_TEMPLATE = '''<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="robots" content="noindex, nofollow" />
        <meta http-equiv="REFRESH" content="0.0;url={redirect_to_url}" />
    </head>
    <body></body>
</html>'''

def apply_map():
  total_files = 0
  with open(FILE_TO_URL, encoding="utf-8") as file_to_url:
    cvs_reader = csv.reader(file_to_url, delimiter=',', quotechar='|')
    for row in cvs_reader:
      file_path = row[0].lower()
      redirect_to = row[1]

      dir_name = os.path.dirname(file_path)
      if dir_name:
        os.makedirs(dir_name, exist_ok=True)

      with open(file_path, 'w', encoding="utf-8", newline='\r\n') as redirect_file:
        redirect_contents = REDIRECT_FILE_TEMPLATE.format(redirect_to_url = redirect_to)
        redirect_file.write(redirect_contents)
      total_files += 1

  print(f'Created redirect files: {total_files}')

def save_map():
  root_dir = '.'
  redirect_url_regexp = '<meta http-equiv="REFRESH" content="0.0;url=(.+?)"'

  #current query catches all redirects including several file with full xml page provided:
  #./en/betas/oie/Content/user-doc-home.htm
  #./en/betas/oie/Content/docs_home_beta.htm
  #./eu/ja-jp/Content/docs_home.htm
  #./eu/en-us/Content/docs_home.htm
  #./wf/en-us/Content/docs_home.htm
  #./oie/en-us/Content/docs_home.htm
  #./oie/en-us/Content/user-doc-home.htm

  # we can switch to this version, if we decide to not overwrite those files
  #redirect_url_regexp = '<meta http-equiv="REFRESH" content="0.0;url=(.+?)" />\n    </head>'

  total_files = 0

  with open(FILE_TO_URL, 'w', encoding="utf-8") as file_to_url:
    csv_writer = csv.writer(
      file_to_url,
      delimiter=',',
      quotechar='|',
      quoting=csv.QUOTE_MINIMAL)
    for subdir, dirs, files in os.walk(root_dir):
      for file in files:
          filepath = subdir + os.sep + file

          if filepath.endswith(".htm"):
              with open(filepath, encoding="utf-8") as htm_file:
                found_redirect = re.search(redirect_url_regexp, htm_file.read())
                if found_redirect:
                  csv_writer.writerow([filepath, found_redirect.group(1)])
                  total_files += 1

  print(f'Found redirect files: {total_files}')

if __name__ == '__main__':
  parser = argparse.ArgumentParser(description="""\
    Generate bacon.yml file from bacon.json
    """)
  parser.add_argument(
      'method',
      help='apply_map: load map and create redirects. save_map: create file to url map',
      nargs='?',
      default='apply_map')
  args = parser.parse_args()

  if args.method == 'save_map':
    save_map()
  else:
    apply_map()

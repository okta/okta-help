#!/usr/bin/env python3

"""

Applying existing redirects
------------------

The default action of this script is to write all existing redirects in
`file_to_url.txt` to the file system. At present, that's over 8,000 files.

        $ cd okta-help # run from repo root
        $ python scripts/redirect_url_utils.py

As far as git changes/history is concerned, this action is not consistent on
all environments. Some systems will show only any new changes between runs,
while other systems will mark as changed every single redirect file, whether
it previously existed there or not.


Adding new redirects
----------------

To add new redirects:

Firstly, create a text file to hold your new redirect pairs. Don't commit this file.
This file must be formatted the same as the existing `file_to_url.txt` file.
Let's call this `my_local_uncommited_redirect.txt`. It contains lines with
the following pattern:

        ./current/file/path.htm,https://my.url.com/redirect/file/path.htm

The redirect path (second member of this pair) can be to another file on H.O.C.,
or an aliased URL, or to an external path somewhere else, such as Okta Support.

Then run the script:

        $ cd okta-help # run from repo root
        $ python scripts/redirect_url_utils.py --update_map my_local_uncommited_redirect.txt

The new redirect files will be created, overwriting whatever existing content was
previously at those paths, and will also append these new redirect pairs to the
`file_to_url.txt` file. Review your changes and, if all is well, commit/push.

"""

import os
import re
import argparse
import csv

FILE_TO_URL = 'scripts/file_to_url.txt'
REDIRECTS_FILE = '_redirects'
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
  _add_redirects_from_file(FILE_TO_URL)

def update_map(file):
  """Update the main redirects file with the new redirect pairs in 'file'."""
  if not os.path.isfile(file):
    print("'%s' is not a file. Try again." % file)
    return False
  _add_redirects_from_file(file)
  with open(FILE_TO_URL, 'r', encoding='utf-8') as f:
    redirects = f.readlines()
  with open(file, 'r', encoding='utf-8') as f:
    new_redirects = f.readlines()
  for new_re in new_redirects:
    redirects.append(new_re)
  with open(FILE_TO_URL, 'w', encoding='utf-8') as w:
    for r in redirects:
      w.write(r)

def _add_redirects_from_file(file):
  total_files = 0
  with open(file, encoding="utf-8") as file_to_url:
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
          filepath = os.path.join(subdir, file)

          if filepath.endswith(".htm"):
              with open(filepath, encoding="utf-8") as htm_file:
                found_redirect = re.search(redirect_url_regexp, htm_file.read())
                if found_redirect:
                  csv_writer.writerow([filepath, found_redirect.group(1)])
                  total_files += 1

  print(f'Found redirect files: {total_files}')

def run(file=None, save=None):
  if file:
    print("Adding new redirects...")
    update_map(file)
  elif save:
    print("Saving a map of existing redirects...")
    save_map()
  else:
    print("Applying redirects from existing map...")
    apply_map()

# $ python scripts/redirect_url_utils.py -sync
def sync_redirects_with_netlify():
  with open(REDIRECTS_FILE, encoding="utf-8") as netlify_redirects:
    for line in netlify_redirects:
      line = line.strip()

      if line.startswith('#'):
        continue
      if not '*' in line:
        if line.split():
          netlify_from, netlify_to = line.split()
          netlify_from = netlify_from.strip().lower()
          netlify_to = netlify_to.strip().lower()
          delete_single_file_redirect(netlify_from, netlify_to)

        continue

      strict_redirect = ':splat' in line
      netlify_from, netlify_to = line.split("*")
      netlify_from = netlify_from.strip().lower()
      netlify_to = netlify_to.strip().lower()
      if netlify_from:
        delete_redirects_for_path(f'.{netlify_from}', netlify_to, strict_redirect)

# ./not-eu/ https://help.okta.com/eu/ eu -> False
# ./eu/ https://help.okta.com/eu/ eu -> False
# ./eu/ https://help.okta.com/not-eu/ eu -> True
def out_of_target(path_from, path_to, target):
  if not path_from.startswith(f'./{target}/'):
    # from does not match product
    return False

  return not path_to.startswith(f'https://help.okta.com/{target}/')

def has_substring(path_from, path_to, str):
  return str in path_from or str in path_to

def exact_redirect(path_from, path_to, redirect_path):
  leaf = path_from[len(redirect_path) - 1:]
  return path_to.endswith(leaf)

def delete_single_file_redirect(netlify_from, netlify_to):
  rows = []
  with open(FILE_TO_URL, encoding="utf-8") as file_to_url:
    cvs_reader = csv.reader(file_to_url, delimiter=',', quotechar='|')
    for row in cvs_reader:
      file_path = row[0].lower()
      destination_path = row[1].lower()
      destination_no_okta = destination_path.replace('https://help.okta.com', '')


      if file_path == f'.{netlify_from}' and \
        destination_no_okta == netlify_to:
        try:
          os.remove(file_path)
        except OSError:
          pass
        continue

      rows.append(row)

  with open(FILE_TO_URL, 'w', encoding="utf-8") as file_to_url:
    csv_writer = csv.writer(
      file_to_url,
      delimiter=',',
      quotechar='|',
      quoting=csv.QUOTE_MINIMAL)

    csv_writer.writerows(rows)

def delete_redirects_for_path(netlify_from, netlify_to, strict_redirect):
  # print(f'delete: {netlify_from}')
  rows = []

  with open(FILE_TO_URL, encoding="utf-8") as file_to_url:
    cvs_reader = csv.reader(file_to_url, delimiter=',', quotechar='|')
    for row in cvs_reader:
      file_path_as_is = row[0]
      file_path = row[0].lower()
      destination_path = row[1].lower()

      if not file_path.startswith(netlify_from):
        rows.append(row)
        continue

      destination_no_okta = destination_path.replace('https://help.okta.com', '')

      # skip release notes
      if has_substring(file_path, destination_path, '/releasenotes/') or \
        has_substring(file_path, destination_path, '/release-notes/') or \
        has_substring(file_path, destination_path, '/relnotes/'):
        print('Release notes skipping')
        print(f'  from: {file_path}')
        print(f'  to: {destination_path}')
        print(f'  rule: {file_path_as_is[1:]} {destination_no_okta}')

        rows.append(row)
        continue

      # skip out of product redirects
      if out_of_target(file_path, destination_path, 'eu') or \
        out_of_target(file_path, destination_path, 'wf') or \
        out_of_target(file_path, destination_path, 'oie') or \
        out_of_target(file_path, destination_path, 'oag') or \
        out_of_target(file_path, destination_path, 'asa'):
        print('Out of current product redirect skipping')
        print(f'  from: {file_path}')
        print(f'  to: {destination_path}')
        print(f'  rule: {file_path_as_is[1:]} {destination_no_okta}')

        rows.append(row)
        continue

      # /path/* /new_path/
      if not strict_redirect and \
        not destination_path.endswith(netlify_to):
        print('Destination does not match')
        print(f'  from: {file_path}')
        print(f'  to: {destination_path}')

        rows.append(row)
        continue


      # /path/* /new_path/:splat
      if strict_redirect and not exact_redirect(file_path, destination_path, netlify_from):
        print('Not exact redirect skipping')
        print(f'  from: {file_path}')
        print(f'  to: {destination_path}')
        print(f'  rule: {file_path_as_is[1:]} {destination_no_okta}')

        rows.append(row)
        continue

      try:
        os.remove(file_path)
      except OSError:
        pass

  with open(FILE_TO_URL, 'w', encoding="utf-8") as file_to_url:
    csv_writer = csv.writer(
      file_to_url,
      delimiter=',',
      quotechar='|',
      quoting=csv.QUOTE_MINIMAL)

    csv_writer.writerows(rows)

if __name__ == '__main__':
  parser = argparse.ArgumentParser(description="Create redirect files from a map")
  group = parser.add_mutually_exclusive_group()
  group.add_argument("-u", "--update_map", dest="file", nargs=1,
                     help="Update with new redirects from 'file'")
  group.add_argument("-s", "--save_map", dest="save", action="store_true",
                     help="Create file-to-url map from existing redirects")
  group.add_argument("-sync", "--sync_netlify", dest="sync_netlify", action='store_true',
                     help="Removes files and entries which starts with del_path")

  args = parser.parse_args()

  if (args.sync_netlify):
    sync_redirects_with_netlify()
    exit()

  file = args.file[0] if args.file else None # First (and only expected) item in returned list
  save = args.save
  run(file=file, save=save)

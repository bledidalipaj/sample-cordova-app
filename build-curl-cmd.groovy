String buildCurlCmd(String url, String fileName = '') {
  String cmd = "curl $url"

  cmd = (fileName != '') ? cmd + " -o $fileName" : cmd

  return cmd
}

return this;
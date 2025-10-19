import webview

webview.create_window('PyWebViewMessenger',
                      'http://127.0.0.1:5500',
                      width=400,
                      height=500,
                      resizable=False)

webview.start()
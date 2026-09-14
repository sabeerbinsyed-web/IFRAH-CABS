import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const IfrahCabsApp());
}

class IfrahCabsApp extends StatefulWidget {
  const IfrahCabsApp({super.key});

  @override
  State<IfrahCabsApp> createState() => _IfrahCabsAppState();
}

class _IfrahCabsAppState extends State<IfrahCabsApp> {
  late final WebViewController controller;

  bool loading = true;
  bool hasError = false;

  final String websiteUrl = 'https://ifrahcabs.in/?app=1';

  @override
  void initState() {
    super.initState();

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.white)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) {
            setState(() {
              loading = true;
              hasError = false;
            });
          },
          onPageFinished: (_) {
            setState(() {
              loading = false;
            });
          },
          onWebResourceError: (error) {
            setState(() {
              loading = false;
              hasError = true;
            });
          },
          onNavigationRequest: (request) async {
            final uri = Uri.tryParse(request.url);

            if (uri != null &&
                (uri.scheme == 'whatsapp' ||
                    uri.scheme == 'tel' ||
                    uri.scheme == 'mailto')) {
              await launchUrl(
                uri,
                mode: LaunchMode.externalApplication,
              );

              return NavigationDecision.prevent;
            }

            return NavigationDecision.navigate;
          },
        ),
      );

    _loadWebsite();
  }

  Future<void> _loadWebsite() async {
    await controller.clearCache();
    await controller.clearLocalStorage();

    await controller.loadRequest(
      Uri.parse(websiteUrl),
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    );
  }

  Future<void> _retry() async {
    setState(() {
      hasError = false;
      loading = true;
    });

    await _loadWebsite();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'IFRAH CABS',
      theme: ThemeData(
        useMaterial3: true,
      ),
      home: Scaffold(
        body: SafeArea(
          child: Stack(
            children: [
              WebViewWidget(
                controller: controller,
              ),

              if (loading)
                const LinearProgressIndicator(),

              if (hasError)
                Center(
                  child: Container(
                    padding: const EdgeInsets.all(24),
                    margin: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: const [
                        BoxShadow(
                          blurRadius: 15,
                          color: Colors.black26,
                        ),
                      ],
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(
                          Icons.wifi_off,
                          size: 60,
                        ),
                        const SizedBox(height: 15),
                        const Text(
                          'Unable to load website',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 10),
                        const Text(
                          'Please check your internet connection and try again.',
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 20),
                        ElevatedButton(
                          onPressed: _retry,
                          child: const Text('RETRY'),
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

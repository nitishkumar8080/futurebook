import 'dart:async';
import 'package:flutter/material.dart';

void main() {
  runApp(const MockTestApp());
}

class MockTestApp extends StatelessWidget {
  const MockTestApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'ExamPrep Mock Test',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0C63E4)),
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF4F6F9),
      ),
      home: const TestScreen(),
    );
  }
}

class Question {
  final String questionText;
  final List<String> options;
  final int correctOptionIndex;
  final String explanation;

  Question({
    required this.questionText,
    required this.options,
    required this.correctOptionIndex,
    required this.explanation,
  });
}

class TestScreen extends StatefulWidget {
  const TestScreen({super.key});

  @override
  State<TestScreen> createState() => _TestScreenState();
}

class _TestScreenState extends State<TestScreen> {
  final List<Question> _questions = [
    Question(
      questionText: 'Who was the first Governor-General of Bengal?',
      options: ['Robert Clive', 'Warren Hastings', 'Lord Cornwallis', 'Lord Wellesley'],
      correctOptionIndex: 1,
      explanation: 'Warren Hastings was appointed as the first Governor-General of Bengal under the Regulating Act of 1773.',
    ),
    Question(
      questionText: 'If 20% of a number is 50, then what is 60% of that number?',
      options: ['120', '140', '150', '180'],
      correctOptionIndex: 2,
      explanation: 'Let the number be x. 0.20 * x = 50 => x = 250. So 60% of 250 is 150.',
    ),
    Question(
      questionText: 'Which planet is popularly referred to as Earth\'s Twin?',
      options: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
      correctOptionIndex: 1,
      explanation: 'Venus is often called Earth\'s twin because of its similar size, mass, and bulk composition.',
    ),
    Question(
      questionText: 'Find the odd one out from the given alternatives:',
      options: ['Apple', 'Mango', 'Potato', 'Orange'],
      correctOptionIndex: 2,
      explanation: 'Potato is a vegetable/tuber grown underground, while the rest are fruits.',
    ),
  ];

  late Map<int, int?> _userAnswers;
  late Set<int> _markedForReview;
  int _currentIndex = 0;
  int _remainingSeconds = 600; // 10 Minutes
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _userAnswers = {for (var i = 0; i < _questions.length; i++) i: null};
    _markedForReview = {};
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_remainingSeconds > 0) {
        setState(() => _remainingSeconds--);
      } else {
        _timer?.cancel();
        _submitTest();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String _formatTime(int seconds) {
    int minutes = seconds ~/ 60;
    int remSeconds = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${remSeconds.toString().padLeft(2, '0')}';
  }

  void _submitTest() {
    _timer?.cancel();
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (context) => ResultScreen(
          questions: _questions,
          userAnswers: _userAnswers,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 768;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        title: const Text(
          'SSC CGL Full Mock Test - 01',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
        ),
        actions: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
            margin: const EdgeInsets.only(right: 12),
            decoration: BoxDecoration(
              color: Colors.blue.shade50,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                const Icon(Icons.timer_outlined, size: 20, color: Colors.blue),
                const SizedBox(width: 6),
                Text(
                  _formatTime(_remainingSeconds),
                  style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.blue, fontSize: 16),
                ),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: _submitTest,
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green.shade600,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 16),
            ),
            child: const Text('SUBMIT'),
          ),
          const SizedBox(width: 12),
        ],
      ),
      body: isDesktop ? _buildDesktopLayout() : _buildMobileLayout(),
    );
  }

  Widget _buildDesktopLayout() {
    return Row(
      children: [
        Expanded(
          flex: 3,
          child: Column(
            children: [
              Expanded(child: _buildQuestionCard()),
              _buildBottomControls(),
            ],
          ),
        ),
        Container(
          width: 320,
          color: Colors.white,
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Question Palette', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              const SizedBox(height: 12),
              _buildPaletteLegend(),
              const Divider(height: 24),
              Expanded(child: _buildGridPalette()),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMobileLayout() {
    return Column(
      children: [
        Container(
          height: 52,
          padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
          color: Colors.white,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: _questions.length,
            itemBuilder: (context, index) => _buildPaletteItem(index),
          ),
        ),
        Expanded(child: _buildQuestionCard()),
        _buildBottomControls(),
      ],
    );
  }

  Widget _buildQuestionCard() {
    final currentQ = _questions[_currentIndex];
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 800),
          child: Card(
            elevation: 1,
            color: Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Question ${_currentIndex + 1} of ${_questions.length}',
                        style: TextStyle(color: Colors.grey.shade600, fontWeight: FontWeight.bold),
                      ),
                      TextButton.icon(
                        icon: Icon(
                          _markedForReview.contains(_currentIndex) ? Icons.bookmark : Icons.bookmark_border,
                          size: 18,
                          color: Colors.purple,
                        ),
                        label: Text(
                          _markedForReview.contains(_currentIndex) ? 'Marked' : 'Mark for Review',
                          style: const TextStyle(color: Colors.purple),
                        ),
                        onPressed: () {
                          setState(() {
                            if (_markedForReview.contains(_currentIndex)) {
                              _markedForReview.remove(_currentIndex);
                            } else {
                              _markedForReview.add(_currentIndex);
                            }
                          });
                        },
                      ),
                    ],
                  ),
                  const Divider(height: 18),
                  Text(
                    currentQ.questionText,
                    style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600, height: 1.4),
                  ),
                  const SizedBox(height: 20),
                  ...List.generate(currentQ.options.length, (optIndex) {
                    final isSelected = _userAnswers[_currentIndex] == optIndex;
                    return InkWell(
                      onTap: () => setState(() => _userAnswers[_currentIndex] = optIndex),
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: isSelected ? Colors.blue.shade50 : Colors.white,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: isSelected ? Colors.blue : Colors.grey.shade300,
                            width: isSelected ? 1.8 : 1,
                          ),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 28,
                              height: 28,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: isSelected ? Colors.blue : Colors.grey.shade200,
                              ),
                              alignment: Alignment.center,
                              child: Text(
                                String.fromCharCode(65 + optIndex),
                                style: TextStyle(
                                  color: isSelected ? Colors.white : Colors.black87,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Text(
                                currentQ.options[optIndex],
                                style: const TextStyle(fontSize: 15),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  }),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildGridPalette() {
    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 5,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: _questions.length,
      itemBuilder: (context, index) => _buildPaletteItem(index),
    );
  }

  Widget _buildPaletteItem(int index) {
    Color bgColor = Colors.white;
    Color textColor = Colors.black87;

    if (_currentIndex == index) {
      bgColor = Colors.blue;
      textColor = Colors.white;
    } else if (_markedForReview.contains(index)) {
      bgColor = Colors.purple;
      textColor = Colors.white;
    } else if (_userAnswers[index] != null) {
      bgColor = Colors.green.shade600;
      textColor = Colors.white;
    }

    return GestureDetector(
      onTap: () => setState(() => _currentIndex = index),
      child: Container(
        width: 36,
        height: 36,
        margin: const EdgeInsets.symmetric(horizontal: 4),
        decoration: BoxDecoration(
          color: bgColor,
          shape: BoxShape.circle,
          border: Border.all(color: Colors.grey.shade300),
        ),
        alignment: Alignment.center,
        child: Text(
          '${index + 1}',
          style: TextStyle(color: textColor, fontWeight: FontWeight.bold, fontSize: 13),
        ),
      ),
    );
  }

  Widget _buildPaletteLegend() {
    return Column(
      children: [
        _legendRow(Colors.green.shade600, 'Answered'),
        const SizedBox(height: 4),
        _legendRow(Colors.purple, 'Marked for Review'),
        const SizedBox(height: 4),
        _legendRow(Colors.white, 'Not Visited / Skipped', border: true),
      ],
    );
  }

  Widget _legendRow(Color color, String text, {bool border = false}) {
    return Row(
      children: [
        Container(
          width: 14,
          height: 14,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
            border: border ? Border.all(color: Colors.grey) : null,
          ),
        ),
        const SizedBox(width: 8),
        Text(text, style: const TextStyle(fontSize: 12, color: Colors.black54)),
      ],
    );
  }

  Widget _buildBottomControls() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      color: Colors.white,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          ElevatedButton(
            onPressed: _currentIndex > 0 ? () => setState(() => _currentIndex--) : null,
            child: const Text('Previous'),
          ),
          TextButton(
            onPressed: _userAnswers[_currentIndex] != null
                ? () => setState(() => _userAnswers[_currentIndex] = null)
                : null,
            child: const Text('Clear Response', style: TextStyle(color: Colors.red)),
          ),
          ElevatedButton(
            onPressed: _currentIndex < _questions.length - 1
                ? () => setState(() => _currentIndex++)
                : null,
            child: const Text('Save & Next'),
          ),
        ],
      ),
    );
  }
}

class ResultScreen extends StatelessWidget {
  final List<Question> questions;
  final Map<int, int?> userAnswers;

  const ResultScreen({super.key, required this.questions, required this.userAnswers});

  @override
  Widget build(BuildContext context) {
    int correctCount = 0;
    int wrongCount = 0;
    int unattemptedCount = 0;

    for (int i = 0; i < questions.length; i++) {
      if (userAnswers[i] == null) {
        unattemptedCount++;
      } else if (userAnswers[i] == questions[i].correctOptionIndex) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }

    double totalScore = (correctCount * 2.0) - (wrongCount * 0.5);

    return Scaffold(
      appBar: AppBar(title: const Text('Detailed Performance Report')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Column(
              children: [
                Card(
                  elevation: 2,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      children: [
                        const Text('Overall Score', style: TextStyle(fontSize: 15, color: Colors.grey)),
                        const SizedBox(height: 8),
                        Text('$totalScore / ${questions.length * 2}',
                            style: const TextStyle(fontSize: 34, fontWeight: FontWeight.bold, color: Colors.blue)),
                        const Divider(height: 32),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            _statBox('Correct', '$correctCount', Colors.green),
                            _statBox('Wrong', '$wrongCount', Colors.red),
                            _statBox('Skipped', '$unattemptedCount', Colors.orange),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text('Solutions & Explanation',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                ),
                const SizedBox(height: 12),
                ...List.generate(questions.length, (i) {
                  final q = questions[i];
                  final ans = userAnswers[i];
                  final isCorrect = ans == q.correctOptionIndex;

                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Q${i + 1}. ${q.questionText}',
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                          const SizedBox(height: 8),
                          Text('Your Answer: ${ans == null ? "Not Attempted" : q.options[ans]}',
                              style: TextStyle(
                                  color: ans == null
                                      ? Colors.grey
                                      : (isCorrect ? Colors.green : Colors.red),
                                  fontWeight: FontWeight.w600)),
                          Text('Correct Answer: ${q.options[q.correctOptionIndex]}',
                              style: const TextStyle(color: Colors.green, fontWeight: FontWeight.w600)),
                          const SizedBox(height: 6),
                          Text('Explanation: ${q.explanation}',
                              style: TextStyle(fontSize: 13, color: Colors.grey.shade700)),
                        ],
                      ),
                    ),
                  );
                }),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _statBox(String label, String value, Color color) {
    return Column(
      children: [
        Text(value, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color)),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontSize: 13, color: Colors.grey)),
      ],
    );
  }
}

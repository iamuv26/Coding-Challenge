#include <iostream>
using namespace std;

class Subject {
public:
    int maths;
    int biology;
};

class Teacher {
public:
  int chemistry;
};

class Student : public Teacher, public Subject {
public:
};

int main() {
    Student s1;
    s1.maths = 90;
    s1.biology = 80;
    s1.chemistry = 85;

    cout << "Maths: " << s1.maths << endl;
    cout << "Biology: " << s1.biology << endl;
    cout << "Chemistry: " << s1.chemistry << endl;

    return 0;
}

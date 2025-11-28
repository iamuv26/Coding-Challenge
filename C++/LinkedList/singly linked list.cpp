#include <iostream>
using namespace std;

class Node {
    public:
    int data;
    Node* next;
    
    Node(int data) {
        this->data = data;
        this->next = NULL;
    }
};

// Function to traverse and print the list
void print(Node* head) {
    Node *temp = head;
    while(temp != NULL) {
        cout << temp->data << " ";
        temp = temp->next;
    }
    cout << endl;
}

int getLength(Node* head) {
    int len = 0;
    Node* temp = head;
    while(temp != NULL) {
        temp = temp->next;
        len++;
    }
    return len;
}

// Insert at Head
void insertAtHead(Node* &head, Node* &tail, int data) {
    Node* newNode = new Node(data);
    
    // If list is empty
    if(head == NULL) {
        head = newNode;
        tail = newNode;
        return;
    }
    
    newNode->next = head;
    head = newNode;
}

// Insert at Tail
// Efficient O(1) because we maintain a tail pointer
void insertAtTail(Node* &head, Node* &tail, int data) {
    Node* newNode = new Node(data);
    
    if(tail == NULL) {
        head = newNode;
        tail = newNode;
        return;
    }
    
    tail->next = newNode;
    tail = newNode;
}

// Insert at Position (1-based)
void insertAtPosition(int position, Node* &head, Node* &tail, int data) {
    
    // Case 1: Insert at Head
    if(position == 1) {
        insertAtHead(head, tail, data);
        return;
    }
    
    int len = getLength(head);
    
    // Case 2: Insert at Tail
    if(position == len + 1) {
        insertAtTail(head, tail, data);
        return;
    }
    
    // Validation
    if(position > len + 1 || position < 1) {
        cout << "Invalid Position" << endl;
        return;
    }
    
    // Case 3: Insert in Middle
    // Traverse to (position - 1)
    Node* prev = head;
    int cnt = 1;
    while(cnt < position - 1) {
        prev = prev->next;
        cnt++;
    }
    
    Node* newNode = new Node(data);
    newNode->next = prev->next;
    prev->next = newNode;
}

// Delete from Position (1-based)
void deleteFromPos(Node* &head, Node* &tail, int position) {
    if(head == NULL) {
        cout << "List is empty" << endl;
        return;
    }
    
    int len = getLength(head);
    if(position > len || position < 1) {
        cout << "Invalid Position" << endl;
        return;
    }
    
    // Case 1: Delete Head
    if(position == 1) {
        Node* temp = head;
        head = head->next;
        
        // If list becomes empty, update tail
        if(head == NULL) {
            tail = NULL;
        }
        
        temp->next = NULL;
        delete temp;
        return;
    }
    
    // Case 2: Delete Tail or Middle
    // For Singly LL, we must find the node BEFORE the one we want to delete
    Node* prev = head;
    int cnt = 1;
    while(cnt < position - 1) {
        prev = prev->next;
        cnt++;
    }
    
    Node* curr = prev->next; // Node to be deleted
    
    // If deleting Tail, update tail pointer
    if(curr->next == NULL) {
        tail = prev;
    }
    
    prev->next = curr->next;
    curr->next = NULL;
    delete curr;
}

// Delete by Value
void deleteByValue(Node* &head, Node* &tail, int value) {
    if(head == NULL) return;
    
    // Case 1: Head holds the value
    if(head->data == value) {
        deleteFromPos(head, tail, 1);
        return;
    }
    
    // Case 2: Search for value
    Node* prev = head;
    Node* curr = head->next;
    
    while(curr != NULL && curr->data != value) {
        prev = curr;
        curr = curr->next;
    }
    
    if(curr == NULL) {
        cout << "Value " << value << " not found" << endl;
        return;
    }
    
    // If deleting tail
    if(curr->next == NULL) {
        tail = prev;
    }
    
    prev->next = curr->next;
    curr->next = NULL;
    delete curr;
}

int main() {
    Node* head = NULL;
    Node* tail = NULL;

    // Setup List
    insertAtHead(head, tail, 10);
    insertAtTail(head, tail, 20);
    insertAtTail(head, tail, 30);
    // List: 10 20 30

    cout << "Initial List: ";
    print(head);

    cout << "Insert 15 at Pos 2: ";
    insertAtPosition(2, head, tail, 15);
    print(head); // 10 15 20 30

    cout << "Delete Pos 4 (Tail - 30): ";
    deleteFromPos(head, tail, 4);
    print(head); // 10 15 20
    
    cout << "Tail is now: " << tail->data << endl; // Verify tail update

    cout << "Delete Value 15: ";
    deleteByValue(head, tail, 15);
    print(head); // 10 20

    return 0;
}
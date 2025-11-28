#include <iostream>
using namespace std;

class Node {
    public:
    int data;
    Node* prev;
    Node* next;
    
    // Default Constructor
    Node() {
        this->data = 0;
        this->prev = NULL;
        this->next = NULL;
    }
    
    // Parameterized Constructor
    Node(int data) {
        this->data = data;
        this->prev = NULL;
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

// Function to get the length of the list
int getLength(Node* head) {
    int len = 0;
    Node* temp = head;
    
    while(temp != NULL) {
        temp = temp->next;
        len++;
    }
    return len;
}

// Insert at the beginning
void insertAtHead(Node* &head, Node* &tail, int data) {
    // If list is empty
    if (head == NULL) {
        Node* newNode = new Node(data);
        head = newNode;
        tail = newNode;
        return;
    }
    
    Node * newNode = new Node(data);
    newNode->next = head;
    head->prev = newNode;
    head = newNode;
}

// Insert at the end
void insertAtTail(Node* &head, Node* &tail, int data) {
    if (tail == NULL) {
        Node* newNode = new Node(data);
        head = newNode;
        tail = newNode;
        return;
    }
    
    Node* newNode = new Node(data);
    tail->next = newNode;
    newNode->prev = tail;
    tail = newNode;
}

// Insert at a specific index (0-based indexing)
void insertAtPosition(int position, Node* &head, Node* &tail, int data) {
    
    // Case 1: Insert at Head (Position 0)
    if(position == 0) {
        insertAtHead(head, tail, data);
        return;
    }
    
    // Case 2: Insert at Tail (Position >= Length)
    int len = getLength(head);
    if(position >= len) {
        insertAtTail(head, tail, data);
        return;
    }
    
    // Case 3: Insert in Middle
    int i = 1;
    Node* back = head; // 'back' will be the node BEFORE insertion point
    while(i < position) {
        back = back->next;
        i++;
    }
    
    Node * curr = back->next; // 'curr' will be the node AFTER insertion point
    
    // Create new node
    Node* newNode = new Node(data);
    
    // Step 4: Adjust pointers
    newNode->next = curr;
    newNode->prev = back;
    back->next = newNode;
    curr->prev = newNode;
}

// Delete node at specific position (1-based indexing: 1 is head)
void deleteFromPos(Node* &head, Node* &tail, int position) {
    if (head == NULL) {
        cout << "Linked List is Empty" << endl;
        return;
    }

    int len = getLength(head);
    
    // Check validation
    if(position < 1 || position > len) {
        cout << "Please enter a valid Position" << endl;
        return;
    }

    // Case 1: Delete Head (Position 1)
    if(position == 1) {
        Node *temp = head;
        head = head->next;
        
        // If list becomes empty
        if(head == NULL) {
            tail = NULL;
        } else {
            head->prev = NULL;
        }
        
        temp->next = NULL;
        delete temp;
        return;
    }
    
    // Case 2: Delete Tail (Position == Length)
    if(position == len) {
        Node *temp = tail;
        tail = tail->prev;
        tail->next = NULL;
        temp->prev = NULL;
        delete temp;
        return;
    }
    
    // Case 3: Delete from Middle
    Node* curr = head;
    int cnt = 1;
    while(cnt < position) {
        curr = curr->next;
        cnt++;
    }

    // Adjust pointers to skip 'curr'
    curr->prev->next = curr->next;
    curr->next->prev = curr->prev;

    curr->next = NULL;
    curr->prev = NULL;
    delete curr;
}

int main() {
    Node* head = NULL;
    Node* tail = NULL;

    insertAtHead(head, tail, 1);
    insertAtTail(head, tail, 2);
    insertAtTail(head, tail, 3);
    insertAtTail(head, tail, 4);
    insertAtTail(head, tail, 5); 
    // List: 1 2 3 4 5

    cout << "Initial List: ";
    print(head);

    cout << "Deleting Head (Pos 1)..." << endl;
    deleteFromPos(head, tail, 1);
    print(head); // Expect: 2 3 4 5

    cout << "Deleting Tail (Pos 4)..." << endl;
    deleteFromPos(head, tail, 4);
    print(head); // Expect: 2 3 4

    cout << "Deleting Middle (Pos 2 - Value 3)..." << endl;
    deleteFromPos(head, tail, 2);
    print(head); // Expect: 2 4

    return 0;
}
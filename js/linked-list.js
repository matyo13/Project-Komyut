//Implement linked list
class Node {
    constructor(location, distance){
        this.location = location;
        this.distance = distance;
        this.next = null; 
    }
}

class linkedList {
    constructor(head = null){
        this.head = head;
    }
}
//
// function insertNode(location, distance) {
//     this.length++;
//     let node = new Node(location, distance);
//
//     if(this.tail){
//         this.tail.next = node;
//         this.tail = node;
//         return node;
//     }
//
//     this.head = this.tail = node;
//     return node;
// }
//
// function deleteNode() {
//     if(this.tail){
//         this.length--;
//
//         const tailNode = this.tail;
//         let currentNode = this.head;
//
//         while(currentNode != tailNode){
//             currentNode = currentNode.next;
//         }
//
//         const beforeTail = currentNode;
//         this.tail = beforeTail;
//         this.tail.next = null;
//
//         return tailNode;
//     }
//
//     return null;
// }
//Implement linked list
class createNode{
    constructor(val){
        this.val = val;
        this.next = null; 
    }
}

class linkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}

insert(val) {
    this.length++;
    let node = createNode(val);

    if(this.tail){
        this.tail.next = node;
        this.tail = node;
        return node;
    }

    this.head = this.tail = node;
    return node;
}

delete() {
    if(this.tail){
        this.length--;

        const tailNode = this.tail;
        let currentNode = this.head;

        while(currentNode != tailNode){
            currentNode = currentNode.next;
        }

        const beforeTail = currentNode;
        this.tail = beforeTail;
        this.tail.next = null;

        return tailNode;
    }

    return null;
}
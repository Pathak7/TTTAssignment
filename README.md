# TTTAssignment
This is a assignment to get most frequent N elements from the link http://terriblytinytales.com/test.txt . 

This project is a part of assignment to get most frequent N words in a document given. 
The project uses the <strong>NodeJS, AngularJS, express</strong> as the stack. The frontend makes a post request to RESTful routes defined in the backend,
in turn backend gets the document in the link using REQUESTS library. The input is tokenized into words which in turn are pushed in a SET and their
frequencies are stored in a map. Pair of each unique with their frequency is pushed in a HEAP (priority queue) . Whenever the angular controller
sends POST contents, the rest route uses body parser to get the value of n. Top n elements of max heap are peeped and returned to the angular
controller which in turn displays it in the form of table. Trie could also have been used for better efficiency here.

The project is also deployed on heroku for easy demo

https://tttassignment.herokuapp.com

Thank you

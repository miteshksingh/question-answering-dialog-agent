# question-answering-dialog-agent
## Inspiration
Ever wished that the bot on website X could be smarter? I did. Often, I found my conversations with these bots as scripted and useless. Most of these bots fail to deliver seamless and efficient user experience. Even the state of the art conversational interfaces like Alexa/Siri lack context. They don't understand user behaviors as we do. For example, cancer in "What's the role of X in cancer?" when asked by a doctor should be interpreted differently than when a 5-year child asks the same question. Thus, I decided to understand the state of the art research behind these conversational interfaces. 

An intelligent dialog agent involves many components like question answering, dialog tracking, and generation and user modeling. In my efforts, I dig deeper into the question answering aspect of the dialog agent. A question answering system has 3 components, namely Query Processing, Document and passage retrieval, and answer extraction. I present Eddie - a dialog agent which is highly efficient on extracting answers from passages using neural models. 

## What it does

Given a passage and questions from the passage, Eddie finds the accurate answer to that question using neural models. Such a system forms the basis of the most common search engines. A QA system searches top K relevant passages from all documents relevant to a query and then finds the best-suited answers. Eddie solves the later part by figuring out the correct answer with an accuracy above 90%.

Further, Eddie can speak. It can small talk with you. It replies to a few basic questions like "Who are you?, How are you? Where do you live? ", even when asked (same thing) using different sentences.

## How I built it
Question Answering System

Before the hackathon, I had read quite a few research papers regarding question answering systems. During the hackathon, I downloaded the code for 2 approaches - BERT (Bi-directional Encoder Representation for Transformers) and BIDAF (Bidirectional Attentional Flow). I understood the codes and set them up on Google Cloud Platform. I created a VM instance using a Deep learning image. Each of the models was trained for over 15 hours on GCP using SQUAD (Stanford Question Answering Dataset).  I then created a REST API in Flask to consume these models on a new passage and questions. 

Dialog Agent

The frontend has a UI built in Javascript, HTML, and bootstrap. The backend server is on node.js. I used Web Speech Recognition and Synthesis API for voice to text and vice versa. The interaction between server and UI happened through Socket.io.

The small talk piece was implemented using Google's Dialogflow. I had to provide intents and entities to answer basic questions. 
The UI was built using node.js, socket.io, javascript, HTML, bootstrap. 

## Challenges I ran into
1. Understanding the existing BERT and BIDAF research paper and code was a challenge. Understanding how the concept of self-attention in transformer network was working so well was pretty interesting. The user input of question and passage needed to be given to the ML model.  Thus I had to make minor changes in the code to create the custom API which gets this data. Further, I dig deep to understand the folder structure and the content in each file. 

2. I failed 5 times while setting up correct configs for a VM instance with GPU on GCP. Finally, I used a deep learning image which comes with all the drivers pre-installed. Waiting for over 15 hours for the model and continuously monitoring tensorboard was also fun.

3. Setting a REST API for exposing a machine learning model was totally new for me. I had to choose among Flask, Django and GCP ML Engine. I chose Flask in order to have minimal code. 

## Accomplishments that I'm proud of

1. BERT is state of the art model in QA task and beats human performance. Training, tweaking BERT model and seeing it perform well on any random passage questions was a satisfying experience. 
2. Getting an end-to-end working demo for both Question Answering Task and Dialog Agent Task
3. Building a nice UI experience. 
4. Learning so many new technologies like Flask, GCP, Dialogflow, etc in just a matter of 2 days.
5. Sleeping less than 4 hours on both nights :)

## What I learned

1. Understanding why neural network models work well for QA tasks (the idea of attention)
2. Setting up GPU based VM instances on GCP
3. Exposing ML models as REST API's using Flask
3. Visualizing training epochs on Tensorboard 
4. Socket.io, Web Speech API and Dialogflow

## What's next for Eddie
Eddie is still in nascent stage. I envision a dialog agent to be like a human. It should preserve longer contexts and understand jokes, sarcasm, and denial. It should be backed by a large knowledge base to have an understanding of the world as we have. I plan to incorporate dialogue tracking and generation and user modeling in Eddie. In QA systems, Eddie needs a query processing and document retrieval engine. When I fit all these components seamlessly is the time when Eddie comes alive. 


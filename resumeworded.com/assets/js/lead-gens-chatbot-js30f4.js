$(document).ready(function() {
  
  let started_initial_cta = 0;
  const faceLoadDelay = 5000;

  setTimeout(function() {
      $('#qa-bot-container').show();  
      closeChatBox(1);
    }, faceLoadDelay);

  const loadDelay = 25000;
  const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

  const chatbotClosedTimestamp = localStorage.getItem("chatbotClosed");
  if (!chatbotClosedTimestamp || new Date().getTime() - parseInt(chatbotClosedTimestamp) >= twoDaysInMilliseconds) {
    var condensed_var = 0;
  } else {
    // show default chat widget, e.g. unopened faq chatbot
    var condensed_var = 1;
  }

  // Additionally, set condensed_var to 1 for mobile or small screen sizes
  if (window.innerWidth <= 768) {
    condensed_var = 1;
  }

  setTimeout(function checkAndOpenChat() {
    if ($('.modal').is(':visible') || $('.overlay-container').is(':visible')) {
      // If a modal is visible, wait another minute (60000ms) and check again
      console.log("Modal detected, delaying chatbot");
      setTimeout(checkAndOpenChat, 60000);
    } else if (started_initial_cta === 0) {
      $("#qa-bot-questions").hide();
      openChatBox();
    }
  }, loadDelay);



function showInitialCTA(condensed) {
    started_initial_cta = 1;
    $('#qa-bot-container').fadeIn();  
  if (condensed===1) {
    closeChatBox(1);
  } 
  
  let messages;
  showTimeBasedGreeting(function() {
    if (window.location.pathname.includes('linkedin') || window.location.pathname.includes('networking')) {
      
      const randomNumber = Math.floor(Math.random() * 3);
      if (randomNumber === 0) {
        messages = [
            "I've helped thousands of people improve their LinkedIn profile",
            "Want a free audit of your LinkedIn profile?"
          ];
      } else if (randomNumber === 1) {
        messages = [
          "Want to optimize your LinkedIn profile?",
          "We can analyze it and give you the exact keywords to include to make you stand out",
          "It's free and will just take a min"
        ];
      } else {
        messages = [
          "Most people have awful, under-optimized LinkedIn profiles",
          "And they claim LinkedIn doesn't work!",
          "But what they don't know is a few small tweaks can make a big difference",
          "Want us to show you how? It'll take a min"
        ];
      }

      displayMessagesWithDelay(messages, 0, function() {
          displayCTAButtons("lir");
      });

    } else if (window.location.pathname.includes('cover-letter')) {
     

      const randomNumber = Math.floor(Math.random() * 3);
      if (randomNumber === 0) {
         messages = [
            "Want me to save you hours...and a whole lot of pain?",
            "I'll write a great cover letter for you in a few secs",
            "Well, our AI will",
            "Want a free cover letter on me?"
          ];
      } else if (randomNumber === 1) {
        messages = [
          "Not sure what to say in your cover letter?",
          "Our AI can help. It'll write you a personalized, professional letter in seconds",
          "Want to try it out?"
        ];
      } else {
        messages = [
          "Let us write you a cover letter that you can use for free",
          "It'll only take a min. Sound good?"
        ];
      }

      displayMessagesWithDelay(messages, 0, function() {
          displayCTAButtons("clg");
      });
    } else {
      const randomNumber = Math.floor(Math.random() * 4);
      if (randomNumber === 0) {
        messages = [
          "Want me to score your resume for free?",
          "I'll review it and tell you if you've missed anything important"
        ];
      } else if (randomNumber === 1) {
        messages = [
          "Submitting your resume feels like sending it into a black hole sometimes, doesn't it?",
          "I can help make sure yours stands out to hiring managers",
          "Mind if we take a look and provide some recommendations?",
          "for free"
        ];
      } else if (randomNumber === 2) {
        messages = [
          "We've been reviewing resumes for years and have learned what works and what doesn't",
          "If you're open to feedback, we can take a quick look at yours and share our thoughts",
          "Want a free resume review?"
        ];
      } else {
        messages = [
          "Want expert feedback on your resume?",
          "Let me scan it for you and tell you if you get past the resume screeners",
          "it takes just 2 minutes"
        ];
      }
      displayMessagesWithDelay(messages, 0, function() {
        displayCTAButtons("smr");
      });
    }
  });
}

function displayMessagesWithDelay(messages, index, callback) {
  if (index < messages.length) {
    const message = messages[index];
    const isLastMessage = index === messages.length - 1;
    displayMessageFromCoach(message, isLastMessage ? 1 : 0, function() {
      setTimeout(function() {
        displayMessagesWithDelay(messages, index + 1, callback);
      }, 1500);
    });
  } else {
    if (typeof callback === 'function') {
      callback();
    }
  }
}

function displayMessageFromCoach(message, last_message_from_coach, callback) {
  const messageElement = $('<div class="qa-bot-message"></div>');
  const messageAvatar = $('<img src="https://resumeworded.com/assets/images/kimberley-tyler-smith.png" alt="Coach Avatar" class="qa-bot-avatar">');
  const messageContent = $('<div class="qa-bot-message-content"></div>');
  const messageText = $('<div class="qa-bot-message-text"></div>').text(message);
  const greetingTimestamp = $('<div class="qa-bot-timestamp">Now</div>');

  messageContent.append(messageText);
  messageElement.append(messageAvatar, messageContent);
  messageElement.append(messageAvatar, messageContent, greetingTimestamp);
  
    $('.qa-bot-timestamp').hide();

  showCoachTypingIndicator(function() {
    messageElement.hide().appendTo('#qa-bot-conversation').fadeIn(300, function() {
      if (last_message_from_coach !== 1) {
        $('.qa-bot-message:last-child .qa-bot-avatar').delay(1500).fadeOut(0);

      }
      scrollToBottomOfChat();
      if (typeof callback === 'function') {
        callback();
      }
    });
  }, 1850);
}
    
function scrollToBottomOfChat() {
  const conversation = document.getElementById('qa-bot-conversation');
  conversation.scrollTop = conversation.scrollHeight;
}

function displayCTAButtons(chosenCTA) {
    let positiveCTAs;
    if (chosenCTA==="smr") {
        positiveCTAs = ["OK, sure!", "Let's do it", "Fix my resume", "Review my resume", "Yes, interested"];
    } else if (chosenCTA==="lir") {
        positiveCTAs = ["OK, sure!", "Let's do it", "Yes, interested", "Optimize my LinkedIn", "Review my LinkedIn"];
    } else {
        positiveCTAs = ["OK, sure!", "Let's do it", "Get my cover letter", "Yes, interested"];
    }
    
  const selectedPositiveCTA = positiveCTAs[Math.floor(Math.random() * positiveCTAs.length)];

  const buttonContainer = $('<div class="qa-bot-cta-buttons"></div>');
  const yesButton = $(`<div class="qa-bot-cta-button qa-bot-cta-yes">${selectedPositiveCTA}</div>`);
  const noButton = $('<div class="qa-bot-cta-button qa-bot-cta-no">No thanks</div>');

  buttonContainer.append(yesButton, noButton);
  $('#qa-bot-conversation').append(buttonContainer);
  scrollToBottomOfChat();

  yesButton.click(function() {
    const userMessage = $(`<div class="qa-bot-user-message">${selectedPositiveCTA}</div>`);
    buttonContainer.replaceWith(userMessage);

    let coachMessage = "";
    if (chosenCTA === "smr") {
      coachMessage = "Great. Let's get your resume reviewed. Upload your resume securely below";
    } else if (chosenCTA === "lir") {
      coachMessage = "Great, let's do this. To get started, click the link below";
    } else if (chosenCTA === "clg") {
      coachMessage = "Great, let's do this. To begin, click the link below.";
    }

    displayMessageFromCoach(coachMessage, 1, function() {
      if (chosenCTA === "smr") {
        const uploadButton = $('<a href="https://resumeworded.com/free-resume-review" class="qa-bot-upload-button">Upload Resume</a>');
        $('#qa-bot-conversation').append(uploadButton);
      } else if (chosenCTA === "lir") {
        const uploadButton = $('<a href="https://resumeworded.com/workers/no-login-lir-signup-page" class="qa-bot-upload-button">Start Now</a>');
        $('#qa-bot-conversation').append(uploadButton);
      } else if (chosenCTA === "clg") {
        const uploadButton = $('<a href="https://resumeworded.com/workers/no-login-clg-signup-page" class="qa-bot-upload-button">Start Generating</a>');
        $('#qa-bot-conversation').append(uploadButton);
      }
      scrollToBottomOfChat();
    });

    localStorage.setItem("chatbotClosed", new Date().getTime().toString());
  });

  noButton.click(function() {
    closeChatBox(0);
  });
}






  // function show_faq_questions() {
  //   $.getJSON('workers/chatbot-get-faqs.php?page_url=' + encodeURIComponent(window.location.pathname), function(data) {
  //     $('#qa-bot-container').fadeIn();
  //     // showTimeBasedGreeting(function() {
  //       showGreeting(function() {
  //           showGreetingCTA(function() {
  //               showQuestions(data);
  //           });
  //       });
  //     // });
  //   });
  // }



const greetingMessages = [
  "I've compiled some questions that can make a real difference in your approach.",
  "I often discuss these questions with jobseekers.",
  "These questions will help you think things through.",
  "I encourage jobseekers to consider these questions.",
];

const greetingMessagesCTA = [
  "Choose one and I'll explain why it matters instantly.",
  "Pick one and I'll share my honest advice, instantly.",
  "Select one for my instant expert take.",
  "Select one and I'll offer my seasoned advice.",
];

function getRandomGreeting() {
  const index = Math.floor(Math.random() * greetingMessages.length);
  return greetingMessages[index];
}

function getRandomGreetingCTA() {
  const index = Math.floor(Math.random() * greetingMessagesCTA.length);
  return greetingMessagesCTA[index];
}


 function showTimeBasedGreeting(callback) {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
      greeting = "Hey, good morning";
    } else if (currentHour < 18) {
      greeting = "Hi there, good afternoon!";
    } else {
      greeting = "Hey, good evening";
    }

    const greetingElement = $('<div class="qa-bot-message"></div>');
    const greetingAvatar = $('<img src="https://resumeworded.com/assets/images/kimberley-tyler-smith.png" alt="Coach Avatar" class="qa-bot-avatar">');
    const greetingContent = $('<div class="qa-bot-message-content"></div>');
    const greetingText = $('<div class="qa-bot-message-text"></div>').text(greeting);

    greetingContent.append(greetingText);
    greetingElement.append(greetingAvatar, greetingContent);

      showCoachTypingIndicator(function() {
        greetingElement.hide().appendTo('#qa-bot-conversation').fadeIn(500, function() {
          $(".qa-bot-message .qa-bot-avatar").hide();
          callback();
        });
      }, 750);
  }

  function showGreeting(callback) {
    const greetingMessage = getRandomGreeting();

    const greetingElement = $('<div class="qa-bot-message"></div>');
    const greetingAvatar = $('<img src="https://resumeworded.com/assets/images/kimberley-tyler-smith.png" alt="Coach Avatar" class="qa-bot-avatar">');
    const greetingContent = $('<div class="qa-bot-message-content"></div>');
    const greetingText = $('<div class="qa-bot-message-text"></div>').text(greetingMessage);

    greetingContent.append(greetingText);
    greetingElement.append(greetingAvatar, greetingContent);

    showCoachTypingIndicator(function() {
        greetingElement.hide().appendTo('#qa-bot-conversation').fadeIn(500, function() {
          $(".qa-bot-message .qa-bot-avatar").hide();
          callback();
        });
      }, 1850);
  }

  // function showGreetingCTA(callback) {
  //   const greetingMessage = getRandomGreetingCTA();

  //   const greetingElement = $('<div class="qa-bot-message"></div>');
  //   const greetingAvatar = $('<img src="https://resumeworded.com/assets/images/kimberley-tyler-smith.png" alt="Coach Avatar" class="qa-bot-avatar">');
  //   const greetingContent = $('<div class="qa-bot-message-content"></div>');
  //   const greetingText = $('<div class="qa-bot-message-text"></div>').text(greetingMessage);
  //   const greetingTimestamp = $('<div class="qa-bot-timestamp">Now</div>');

  //   greetingContent.append(greetingText);
  //   greetingElement.append(greetingAvatar, greetingContent, greetingTimestamp);

  //   showCoachTypingIndicator(function() {
  //   greetingElement.hide().appendTo('#qa-bot-conversation').fadeIn(500, function() {
  //     updateTimestamps();
  //     callback();
  //   });
  // }, 1900);
  // }


  // function showQuestions(questions) {
  //   let index = 0;

  //   function showNextQuestion() {
  //     if (index < questions.length) {
  //       showUserTypingIndicator(function() {
  //         const question = questions[index].question;
  //         const answer = questions[index].answer;
  //         const cta = questions[index].cta;

  //         const questionButton = $('<div class="qa-bot-question-button">' + question + '</div>');
  //         questionButton.data('answer', answer).data('cta', cta);
  //         $('#qa-bot-questions').append(questionButton);
  //         questionButton.fadeIn();

  //         index++;
  //         setTimeout(showNextQuestion, 1000); // 1 second delay before showing the next question
  //       }, 1000); // 1 second delay for typing indicator
  //     }
  //   }

  //   showNextQuestion();
  // }



  function openChatBox() {
      $('#qa-bot-content, #qa-bot-header').fadeIn();
      // $('#qa-bot-header-avatar').fadeOut();
      $('#qa-bot-toggle-icon').show();

      if (started_initial_cta===0){
        showInitialCTA(condensed_var);
        started_initial_cta = 1;
      }
    }

    function closeChatBox(initial_state) {
      if (initial_state===1) {
        $('#qa-bot-content, #qa-bot-header').hide();
        $('#qa-bot-header-avatar').show();
        $('#qa-bot-toggle-icon').hide();
      } else {
        $('#qa-bot-content, #qa-bot-header').fadeOut(function() {
          $('#qa-bot-header-avatar').fadeIn();
          $('#qa-bot-toggle-icon').hide();
        });
        localStorage.setItem("chatbotClosed", new Date().getTime().toString());  
      }
      
    }


    $('#perma-toggle-btn-avatar').click(function() {
      if ($('#qa-bot-content').is(':visible')) {
        closeChatBox(0);
      } else {
        openChatBox();
      }
    });

    $('#qa-bot-close').click(function() {
        closeChatBox(0);
    });

    


  // $(document).on('click', '.qa-bot-expand-chat', function() {
  //       openModal();
  //   });

  
// function fadeInElement(element, delay, callback) {
//   if (element.children().length > 0) {
//     // If the element has child elements, recursively fade them in
//     const childElements = element.contents();
//     let i = 0;

//     function fadeInNextChild() {
//       if (i < childElements.length) {
//         const child = $(childElements[i]);
//         if (child.is('br')) {
//           // If the child is a <br> tag, simply append it and move on
//           element.append(child);
//           i++;
//           fadeInNextChild();
//         } else {
//           fadeInElement(child, delay, function() {
//             i++;
//             fadeInNextChild();
//           });
//         }
//       } else {
//         if (callback) callback();
//       }
//     }

//     fadeInNextChild();
//   } else {
//     // If the element has no child elements, fade in its text content
//     const words = element.text().trim().split(' ');
//     element.empty();

//     let j = 0;
//     function fadeInNextWord() {
//       if (j < words.length) {
//         const word = $('<span>').text(words[j] + ' ');
//         element.append(word.hide().fadeIn(50));
//         j++;
//         setTimeout(fadeInNextWord, delay);
//       } else {
//         if (callback) callback();
//       }
//     }

//     fadeInNextWord();
//   }
// }

// $(document).on('click', '.qa-bot-expand-chat', function() {
//   openModal();
// });

// Handle question button click
// $(document).on('click', '.qa-bot-question-button', function() {
//   const question = $(this).text();
//   const answer = $(this).data('answer');
//   const cta = $(this).data('cta');

//   $(this).fadeOut(function() {
//     $(this).remove();
//   });

//   // Display the clicked question in the conversation
//   const userQuestion = $('<div class="qa-bot-user-message">' + question + '</div>');
//   $('#qa-bot-conversation').append(userQuestion);

//   // Now, we'll add an 'Expand Chat' button to the chat conversation instead of the modal
//   const expandChatButton = $('<button class="qa-bot-expand-chat">Expand Chat</button>');
//   $('#qa-bot-conversation').append(expandChatButton);


//   // Open the modal and display the conversation
//   openModal(function() {
//     $('#qa-bot-modal-conversation').append(userQuestion.clone());

//     const coachAnswer = $('<div class="qa-bot-coach-message"></div>').html(answer);
//     $('#qa-bot-modal-conversation').append(coachAnswer);

//     // Set a fixed initial height for the coach's answer container
//     const initialHeight = 20; // Adjust the initial height as needed
//     coachAnswer.css('height', initialHeight + 'px');
//     coachAnswer.css('overflow', 'hidden');

//     // Display typing indicator
//     const typingIndicator = $('<div class="qa-bot-typing-indicator">...</div>');
//     $('#qa-bot-modal-conversation').append(typingIndicator);

//     // Delay before starting the animation
//     const delayDuration = Math.random() * 1000 + 500; // Random delay between 500ms and 1500ms

//     setTimeout(function() {
//       // Remove typing indicator
//       typingIndicator.remove();

//       // Gradually increase the height of the coach's answer container
//       const targetHeight = coachAnswer.prop('scrollHeight');
//       const animationDuration = 8000; // Adjust the animation duration as needed
//       const incrementCount = 15; // Number of incremental steps

//       coachAnswer.animate({ height: targetHeight + 'px' }, {
//         duration: animationDuration,
//         easing: 'linear',
//         step: function(now, fx) {
//           if (fx.prop === 'height') {
//             const currentHeight = now;
//             const increment = targetHeight / incrementCount;
//             const highlightThreshold = currentHeight - increment;

//             // Apply text highlighting effect
//             coachAnswer.children().each(function() {
//               const elementTop = $(this).position().top;
//               if (elementTop <= highlightThreshold) {
//                 $(this).css('background-color', 'rgba(255, 255, 0, 0.3)');
//               } else {
//                 $(this).css('background-color', 'transparent');
//               }
//             });
//           }
//         },
//         complete: function() {
//           // Remove the height and overflow styles after the animation
//           coachAnswer.css('height', 'auto');
//           coachAnswer.css('overflow', 'visible');

//           // Remove text highlighting
//           coachAnswer.children().css('background-color', 'transparent');

//           // Display loading dots for CTA
//           const ctaLoading = $('<div class="qa-bot-loading">...</div>');
//           $('#qa-bot-modal-conversation').append(ctaLoading);

//           setTimeout(function() {
//             ctaLoading.remove();

//             if (cta) {
//               const ctaMessage = $('<div class="qa-bot-coach-message">' + cta + '</div>');
//               $('#qa-bot-modal-conversation').append(ctaMessage);

//               fadeInElement(ctaMessage, 50, function() {
//                 // Show email form
//                 $('#qa-bot-email-form').fadeIn();
//               });
//             } else {
//               // Show email form
//               $('#qa-bot-email-form').fadeIn();
//             }
//           }, 1000);
//         }
//       });
//     }, delayDuration);
//   });


  
// });



  // // Open the modal with conversation
  // function openModal(callback) {
  //   $('#qa-bot-modal').fadeIn(function() {
  //     if (callback) callback();
  //   });
  // }

  // Close modal when close button is clicked or email is submitted
  // $('.qa-bot-close').click(closeModal);

  // $('#qa-bot-email-form').submit(function(event) {
  //   event.preventDefault();
  //   const email = $('#qa-bot-email-input').val();
    
  //   $('#qa-bot-email-form').fadeOut(function() {
  //     // TODO: Send email to server and handle response
  //     // Simulate success for now
  //     const isSuccess = true;

  //     if (isSuccess) {
  //       const successMessage = $('<div class="qa-bot-coach-message">Great! Sending that over to you right now.</div>');
  //       $('#qa-bot-modal-conversation').append(successMessage);
  //       setTimeout(closeModal, 2000);
  //     } else {
  //       $('#qa-bot-email-error').fadeIn();
  //     }
  //   });
  // });

  // Close the modal
  // function closeModal() {
  //   $('#qa-bot-modal').fadeOut();
  // }

  // // Type out a message character by character
  // function typeMessage(element, message, callback) {
  //   let i = 0;
  //   const typing = setInterval(function() {
  //     if (i < message.length) {
  //       element.append(message.charAt(i));
  //       i++;
  //     } else {
  //       clearInterval(typing);
  //       if (callback) callback();
  //     }
  //   }, 50);
  // }

  // Update timestamps every minute
  // function updateTimestamps() {
  //   $('.qa-bot-timestamp').each(function() {
  //     const timestamp = $(this);
  //     const elapsedMinutes = Math.floor((Date.now() - timestamp.data('timestamp')) / 60000);
  //     if (elapsedMinutes <= 5) {
  //       timestamp.text(elapsedMinutes + 'm ago');
  //     }
  //   });
  // }

  // Set initial timestamp data attribute
  // $('.qa-bot-timestamp').each(function() {
  //   $(this).data('timestamp', Date.now());
  // });

  // Update timestamps every minute
  // setInterval(updateTimestamps, 60000);


function showCoachTypingIndicator(callback, delay) {
    const typingIndicator = $('<div class="qa-bot-message"></div>');
    const typingAvatar = $('<img src="https://resumeworded.com/assets/images/kimberley-tyler-smith.png" alt="Coach Avatar" class="qa-bot-avatar">');
    const typingContent = $('<div class="qa-bot-message-content"></div>');
    const typingText = $('<div class="qa-bot-message-text">...</div>');

    typingContent.append(typingText);
    typingIndicator.append(typingAvatar, typingContent);

    $('#qa-bot-conversation').append(typingIndicator);

    setTimeout(function() {
      typingIndicator.remove();
      callback();
    }, delay);
  }

  // function showUserTypingIndicator(callback, delay) {
  //   const typingIndicator = $('<div class="qa-bot-user-message">...</div>');

  //   $('#qa-bot-questions').append(typingIndicator);

  //   setTimeout(function() {
  //     typingIndicator.remove();
  //     callback();
  //   }, delay);
  // }




  

});
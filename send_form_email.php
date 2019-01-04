<?php

if(isset($_POST['mail'])) {
 
     

 
    $email_to = "contact@diqcotech.com";
 
    $email_subject = "DiQco form email";
 
     
 
 
    function died($error) {
 
        // your error code can go here
 
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
 
        echo "These errors appear below.<br /><br />";
 
        echo $error."<br /><br />";
 
        echo "Please go back and fix these errors.<br /><br />";
 
        die();
 
    }
 
 
    // validation expected data exists
 
    if(!isset($_POST['name']) ||
 
        !isset($_POST['mail']) ||
  
        !isset($_POST['message'])) {
 
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
 
    }
 
 
    $name = $_POST['name']; // required
 
    $mail = $_POST['mail']; // required
 
    $message = $_POST['message']; // required
     

    $error_message = "";
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$mail)) {
 
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
 
  }

//     $string_exp = "/^[A-Za-z .'-]+$/";
//  
//   if(!preg_match($string_exp,$first_name)) {
//  
//     $error_message .= 'The First Name you entered does not appear to be valid.<br />';
//  
//   }
//  
//   if(!preg_match($string_exp,$last_name)) {
//  
//     $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
//  
//   }
  
  if(strlen($message) < 2) {
 
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
 
  }

  if(strlen($error_message) > 0) {
 
    died($error_message);
 
  }
 
    $email_message = "Form details below.\n\n";
 
     
 
    function clean_string($string) {
 
      $bad = array("content-type","bcc:","to:","cc:","href");
 
      return str_replace($bad,"",$string);
 
    }
 
     
 
    $email_message .= "Name: ".clean_string($name)."\n";
 
    $email_message .= "mail: ".clean_string($mail)."\n";
 
    $email_message .= "message: ".clean_string($message)."\n";
 

 
     
 
// create email headers
 
 
 mail('contact@diqcotech.com', 'DiQco Form Mail', $message, null,
   '-f'.$mail);
   
    
echo 'Thank you for contacting us. We will be contact you very soon.';
header('Refresh: 3;url=http://www.diqcotech.com/');
 

 
}
 
?>
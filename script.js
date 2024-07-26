document.getElementById('button').addEventListener('click', function() {
    const loader = document.querySelector('.spinner');
    const jokeElement = document.getElementById('joke');
    const category = document.getElementById('type');
    const facebookShare = document.getElementById('facebook-share');
    const twitterShare = document.getElementById('twitter-share');
    
    loader.style.display = 'block';
    jokeElement.hidden = true;
    category.hidden = true;
    
    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        jokeElement.hidden = false;
        category.hidden = false;
        category.textContent = data.category;
        let jokeText = "";
        
        if (data.type === 'single') {
          jokeText = data.joke;
        } else {
          jokeText = `${data.setup} - ${data.delivery}`;
        }
        
        jokeElement.textContent = jokeText;
  
        // Update social media share links
       
  
        const utterance = new SpeechSynthesisUtterance(jokeText);
        const voices = window.speechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.name === 'Google UK English'); // Choose a voice by name
        utterance.pitch = 1.5;
        utterance.rate = 1;

        utterance.volume = 0.9;
        window.speechSynthesis.speak(utterance);
        
        loader.style.display = 'none';
        facebookShare.href = `https://www.facebook.com/?text=${encodeURIComponent(jokeText)}`;
        twitterShare.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(jokeText)}`;
      })
      .catch(error => {
        console.error('Error fetching joke:', error);
        loader.style.display = 'none';
      });
  });
  
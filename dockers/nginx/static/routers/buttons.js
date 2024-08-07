import {loginButton, loginWithGithubButton, loginWith42Button} from '/static/src/js/login/login.js';
import {accountButton} from '/static/src/js/account.js';
import {playButton} from '/static/src/js/play.js';

export const handleButtonAction = (e, action) => {
    switch(action) {
		case 'login':
			loginButton();
			break;
        case 'loginWithGithub':
			loginWithGithubButton();
            break;
        case 'loginWith42':
			loginWith42Button();
            break;
		case 'account':
			accountButton(e);
			break;
		case 'play':
			playButton();
			break;
        default:
            console.log('Unknown action');
    }
};

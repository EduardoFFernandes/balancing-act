/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;
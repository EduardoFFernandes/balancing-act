/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;
/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;
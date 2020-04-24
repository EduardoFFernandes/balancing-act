/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;
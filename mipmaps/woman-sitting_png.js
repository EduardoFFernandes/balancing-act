/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const mipmaps = [
  {
    "width": 160,
    "height": 243,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 80,
    "height": 122,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 40,
    "height": 61,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 20,
    "height": 31,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAfCAYAAADnTu3OAAAAAklEQVR4AewaftIAAASPSURBVI3BT2xTdQDA8e/7vd97v9c/r+3a2TFaJo4RlAUFxJjowYvGBLgQjGICJCZGYkIinDTRxIPxbKIXjYTgxZuJicGDxj9ROaAE0GRwgOEfxsbWrn/Wrn1t3x/b0Jqn6TY/H43/KXNf9i0rYr0YBNpYp91adj3vZ6nL3Z7n1kvFwnHgBl0a/8N4Lv+pNM0DyVQmoQG6Lmg5TQwVwfd8KpVCZaVceXulWnlfZyOa9txoNvtmJBqLRZTF6GgGpRRCCKLRKK7roeuGFQT+w7WV6keSDeS2TJw0DEspU5FMJjH8Di8/tRND6pz9fgaNGOCjLCsHnJRswDCNHb7vY0cjPL9vgvs3ZYhZip79j2zhsytzKFOh6wbSMOKC9Zlux01akSiH920lbUeJWYqelXqD+8cyPDQi6bgdLCvK2PjmQ4J12InE67qUEYIA0zBZKJYZmCuUEBqkk3EikQitVpN2y7ktWEcynX7WMBWg0fE8HshlmZ27S89YOokyTVqujy50hNCRhlGXrMP3vJrnuQghKNcaSF3H8wMWS1WCIMCQOj2tdgtd19E0zRasY/727QOddrsthODSjTt0Oi7bnznCrkOvEKQn8Dyf2cUVCMB1O7iuW9ZZX6Bp4jE7kdrR8HTajRVSziLV2d/QmlV+uHqTm5U2zWaDeq1WufPXnx/qbMCKxnZbVmTEcRp3Z/5ckN/8eiNqW1OY41OUAo30SIrMyIjz3bdfPw18IdlAtVR8o1oq/nj48HMntnVNT0+Ty+XRdZ2d7KJnfn5eO3v2zBW6JMPtOnHilXeBXLFYiu3du3fb1NR2mc1mGcY0DQU8BlyQ/Fvi6NFj70xOTh7M5/OTmcwo6XSatRQKBRKJBJom6IrQJQk5der0B/v3HzhuGAZrKZfLVKtVerLZLEoplpeX28AluiQhUho9DLRaLWq1GrXaCu1SE9cKmJiYYOvWrYQ1m815oEKXJOTaha9W/fI8mx96BNd1MQyDeDyOUopicYnpx/dg2wn+q9FYXaBPEqKUsZtWnXQ6jRACx3FQStFjj6eQUjKM4zg1+gQhjz44ud2OxxFC0FMqlRjwfR8hNIap11dX6BOEXK/wy8jUwwwEAf8IggDQGMbzXI8+QcimXD5Ijd7HMJqmsRalLEWfIMT3PZeQdrvFgK7r+L7PGjT6BCGWFUkRsrS0VKFPSonrugwTi0WT9AlCLEulCKlWq5fr9To9pmnSbDYYJhaLZ+gThEgpY4SYppovl8t36JJSUigUGEYpNUKfJEQIESGkUFiq+b7/Uz6ff0HTNCzL5OrVyySTKTRN0OO6LnNztxmQ3HPwiSeePPb773/Y5XKZgcXFpfj581++Nz09fXBsLBtTSqGU4h6fHsMQOE5jlj65Z8+edycnt522bTvSbndYWioysGnT+F7g4vXr177IZNJHpJQMs7xcKtAncrn8S7ZtR/iPIAgIgsCi69y5T16dmZm53Gg0CIKAAcdxuHXr1p0zZ86co08DXrMsa1wppRHiuq6/urp6EficeyTwcjKZ3GLbtvQ8L1hYWLgLfAys0vc3S3K4Mn1j3tEAAAAASUVORK5CYII="
  },
  {
    "width": 10,
    "height": 16,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAklEQVR4AewaftIAAAHGSURBVF3BMVPTUAAH8H9eXkKSpkmtXFtL7igCWguOVuD8BK6o5/kBOooLsxOTu5ubi8dxbn4NHTgH7SDI4dU2pXkNvDTJ6/MxeNb+fhrm1OpLzx23+JpSWpdSXohcDPq9Xy91zFms1t6Xb9zcfHRvZeF2tVwKuagLKQKK/+m6Tu8821rHg2YDUXyFkwEDY84awYxaEOzrumGXChbSLIeUElXfwXQqQDBDA3qahukkE8CtFkzbBeMpCCFSx4yYsS+l8uLjXhi5zuTSGuUGzsaT6enpz3cU/1Q7nc5+oeCet1obq0EQwLIs3N2JcXT44S2Fsrf36un29s4bx7GXi0UP1+I4xmg0gq7rUAwKJb4IG1lytTwWGYbDEMk4wWpzHZRSRFEUAugSKH4+vP/77AcYiwBIFEoFUEpxTUrJoBAol+7SuV+tI89zzJNSTqEQKJ7vE2oYSNM0xxxN0ygUAsXzihUohJATzvlEwV+EEB8KBdDs9wcN27bBGEs8z/tcLi9sdbvfQKkBxqIcCt3dffKJsfHK8fFXcM5rlmUetNvtTcdxXCkFkoR/h6KZpvnCsiwbSpZlQ875RwAPK5XKhhAiCcPwEED2B69Tu88RbPipAAAAAElFTkSuQmCC"
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = SimLauncher.createLock( mipmap.img );
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = () => {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;
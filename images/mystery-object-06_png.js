/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAABCCAYAAAAoj+QWAAAACXBIWXMAAAk6AAAJOgHwZJJKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADEJJREFUeNrsWnmQFcUZ/3qO9/Zid+VaFjDh8AA5BAURRSHqIhBUgpqFVdAoiH8Zq/CMVUatMhI1SZUHRgREvFZcBCQiUpVKEA9wY8SKVhYrArIgLLCPvdjrzUyn79czb+a9p+4fMUUvQ/f29PT8+uvf9339fbMIYwxR5brrK1/Jz88/62RbW7/u7m7keV5pcXExTiQSHum/adOmDX+BHigIoXGkKtW6dhNcTRmfCQM+Z87cV7q6uqr27KlDDz70CFz2s6nwk9MHq/vNzS1QUTG9s7Z2V3m2F2QCe+WVM2ts2y4bPWZsbNDgwTF57+OPPmw7kUi48Xi8fuPGtxaQd+zOCvyGGxeONQzjs/MnTDRM04TPd38GnuvC0ruWwqhzRqpxyx7/A9Tu2nn3+vVvPvldQc+de92DrusuIc2ytWtfMktKikPH7dxVC7979NGOvn37Llu9euUj+j0jONh1nBW/rJxnjBk9Gs4ZORLmz6+CyRdPgXvvuRfWb3hbjZs29VIg0pr6XUEvWrxkUe8+fR6449d3Dpx22eXmwoU3sR0MKxdOmggvv7w2v6Wl5cHp02fckBG4ZdtDCvLzfX0DBgyAvPz8fWtWr/pMgqeTHj3acOF3AX3V1XMuicXifyTCYLQYO2YMTLpwMmQCT3dj1aqVZlNT00pCr9JI4OXlA0uDfYcOHSITlKzevHnTedWvv/ahBD9i5KgCMtmQXIHblrVu5qxZvfS+SZMmwZRLp8Ktty7KCH7hzb/Kq6yc/4AScHAQ4XU82EcsCHS0txfRds2bb8zet3fvl6Q58PIrrig4kWh8iLRvzga6qurGZdNnzBwQ3E1azhs/Ho42NMAtt9zqEZ0xwp5fcMN82LrlnetJ8+5QiScSjYeCfYMHDQJiDifTNrUin35aO+r555YnRpx9Jhw4cGB+LlJva2urOvOMMyLvjya0cRyncV3Nho4oqVNzHEmVRGPj1+0d6c8Wl5Qoe0jB9+vff879993f8duHH45ddNGUnTr/wsrZI0b2j7q3ffv2zs2bNr7/9tsbz3p82WMnosZRHxJNFct67sMPPri0oqLC13/W2SOGVc6rmvdG9WvV9PdXX1m7g2j64meeeuqFxUtuLyNl67x5VTvIAvrpz3V2dp5PfELr2HPH+SjYmEjAjve3dxFn9m8i6d/X1Kxj8w4bNvxlokP3XvuLq9OAE2PgRAKnwIgDuu/iKVPO1fk4ccIE+GTnx38iwLZKp7Nt29ZXCXhY/szTK8mkkxwnecHqNWtRca+U/g0cWA5PPPFk8uDBeqp5xRTwm+veaC4oKNiy9qUXf0Pm2q85pdLZs6+eHibtA/UHCV1Kj2T0nGyCq66pv23J7UU6+IPEurz37pZ6IsWVb71V84g+nnjBZ0nzSmKb+9x3z1LffNRa3LhgoTN06DDrwDf7PydHhWmkexxxRBNisdjo1tbWae3tJwvLBw7Km3vtdUVh0g46PBR1VqE2l1RbFiy8qahP796+e//64gv4as+eVtd19jY3NXUSxasbNnz47oaGhiMH6+vXrHhhRVz3soxar6+DddWvH9u3b2/+8ePH8u64c6lF/QPdEcZfsUt1e76iiux7dtvWdzvIDv21uvq1q5SwLrlkcl1+YV5xmKJiD6O8eK/S03r3MYuLS1BhYZExZOjQtEWSHYB/1H4CLc3NuK2tFSWTDgwPWBBq7giVvMLCgiQRlknGIHkvLz+elO2urk4n0XgsqT9b1KswiQykJIwAOVa/stPK7n9sfwaLcJRcX7MWNeXffsONC3b7EvMUA8M8CaVGMyyYkIA+/Y+i5Y9dAKtXvZg2yzPLn4e+p28zzhhZFw95iZnZmJ70/bZ1w/h05cxUCgragLwY/heKAT/Scgr4KeA5Fqv+myN5VEt7qnR3O5H3du2Iw3/qfvi76r48CVZt7T9nkhitevYdQ8syDTbZ9mC2Rama2lQsan4ZXxZGzlE6wIDe5Z1ADTK9PFYjVrui7bJ+3hdWWg/H4fC3Te9ZxBn8vWLG5Z0FQxoiuWSRKS0yFa8xW4TFAHPQpmqTe+aoSODl5R1QNuQgA8XBSdCIXU7gSgIKmaUMiooLjljZFMDWANsMNBaggS2GA/fUIjLvGoY4gSiBu+QJCji1i0hd/MeA7lDwEO2AJGhbA21pwE12eaLGnCaAMysUxmxOjxEME9BYSNoQYFOU467dY7OGgY8ELqUsQdsMJGiU8RRFGP8xb6MM4C2kA0fiWV47Stbgg4nJaDpzkDahwG0BzA6A5rTxfJKngE2Ec6MKWVMMcygeIjAxoQsSSs2WA0Lu/pkw+wHG+0jguqR1ZeS0CQFO2zilnNk4bjOOExJgwWdaIyQAg6ol8bj1waodHbqlgZYWJQWacjWM50akEfPrDRZWw0ijhicAYyVlHbgXJXFbgfEroiXoooOWHOe1x6WOskicjIlhl9CDWwyXwSHgMV8A/88T9AC1hxZjOigjkAZcKpqp1VLSpm8hmvTJ6ykgCR5lsipC4hQmHcusCXkgqVFDctoSO8NtvY4L+4FbmrRT1kKXvn+MBG1hyXkvJ44z28+UEoESLRISxnwGD0lqeMzqcGmjcIkbwq2bgdWlFuEpyXLacNC2thsmc9iZJE4oR6miXIygB0Fpi18YYGp5UAqDK0Cbmj5YOk30s4gZvLAmMcVveY/WDltMtvOOzSwylZ8l1E6qJRLzGkziKYp4wsKDqDHI9Y6bNevntb37l1jg81qBlEVkG/v6jzW2Q7/+6UmrlpYWiNvE5cdMH6F0rfD3BwJ37fR5vCHRzFLdTz/7Z/xjKpWV87tORUCngP/fx5zkanr3nc3Ortr3rWwWJcyaBMfmYlXCrIW0LlGWxWdVjic6aOi2u2LGZYem3db00xi5HSN2M06uGLHJMVYTJ0PPGOR3W/YTJ2JT54OSzC7T32PMGbmweM0cWLVyRWgKbuJpm2DC4I8giUzoIhY6SS8U4zW7SNCg7tG2wWty8T4Eh/cPhr+tj200Mq2OhQUYiQNPykWzfgTiPMhP0vR87UnfHVHI+tQ4LMJsPj+fT/ZDhA3H6RxHKnbBKvIWW4e0RWgBLm9zX0vBuCKGzFR4YMzjzFSwbKgjK0ap92MfJn/tc/k6aH4W1gBSKWHsi85dEQS47FRtsCMtyng2BHb+cBhwehFnjsxAxI980b9akFaHApdBrHwYi/OCHpWb7BxhiH7Shy0eQOBApBsqcR4YU44r8EIINCLykNyNVG7F84EPAe75QILKd5hqEVgkbES4JUNb9s+GtNgqpNAcFwdNjmTYZkdbtgABWFEIpe+ALvUAcFCrtzSp6/1coPzwT4NkdqTGMtyi9sfJCJynIghgbArQPIRztRwLu5j0/bR0NepGSBypJI2rtQ0WlYNYAPkhUlL0oOCpYmErO3AF2uAZK2SINq+ltN0AYC9K4qmBqYN7KlnjaQkbpPIfMgiQUUu2CMhlVOHgHCVhbquDaTj5bjdE6mlUSYEHRQ1DReSIUQMpWy3SB0golrDqOCPHEQPpCWnLWgJ0NHCOTh2FLRXpW8GtlFJ3BEUcXwqB8xmQJyTNUwmcj1juQ0arktQsSco0CkkjpBbnl7x/UWnAPSEVQ8sncaMo6YG1QA8L0ymtDc1oZc6r0A+E3cj0Kx3SFZQvxlGcR2kLiEwIyUSNIWwE8rkVUxlM6eVMLHUU+RI2UcqZlEcE4Ok3L8BpKW1XYHEC4DPmDh0fXEMlaSAtSYOZUrqi180KXCinZmLDgLNxItGZVP05JD09BV5y21AReercgFnew9OibyMQ/KYBR1LikGbyHCXpVFJfl3bOaWY3LfrWeW2I1AHyJY+ym0PEct1Bx+JfgP+LRDIiI2lle5F+nJSOwBJ9rgbcyCGxn2TAzbRPKJ7GadcHPDqNmvWTuKuOlzKfx7dZJoo8oZiGLzEcfaztEul//SDlhpi+ZBZ9yelbPp28WzgMT2W3QH1NMNWXN5TlkOXnuAQdBj6XmDPn4oht9ecVkY8qmZSTPt+ljsugKBLm0nsUePAUmeI3EgTILvFuIXHsk3jugL838OACQKV/UdZch6M4Dt8LbI8AjzKd2TmOeuKVKeDt+8t6ZMLmE83sr5CDpeHIYejujLMvwz+k0E/iAG38j8lmXTPjLts2R/cEcOTZk2OxeOifKrWePLE7Frfbfug7ujq7a/4rwACF3CxZMr7iagAAAABJRU5ErkJggg==';
export default image;
// Copyright 2013-2020, University of Colorado Boulder

/**
 * Primary model class for the 'balance lab' tab in the balancing act
 * simulation. This model depicts a plank on a fulcrum with a collection of
 * masses that the user can put on and remove from the plank.
 *
 * @author John Blanco
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import PhetioGroup from '../../../../tandem/js/PhetioGroup.js';
import PhetioGroupIO from '../../../../tandem/js/PhetioGroupIO.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import balancingAct from '../../balancingAct.js';
import BalanceModel from '../../common/model/BalanceModel.js';
import BrickStack from '../../common/model/masses/BrickStack.js';
import MysteryMass from '../../common/model/masses/MysteryMass.js';

/**
 * @param {Tandem} tandem
 * @constructor
 */
function BalanceLabModel( tandem ) {
  BalanceModel.call( this, tandem );

  // @public {PhetioGroup<BrickStack>}
  this.brickStackGroup = new PhetioGroup( ( tandem, numberOfBricks, position ) => {
      const brickStack = new BrickStack( numberOfBricks, position, {
        tandem: tandem,
        phetioDynamicElement: true
      } );
      brickStack.userControlledProperty.set( true );
      brickStack.animationDestination = position;
      return brickStack;
    },
    [ 1, Vector2.ZERO ], {
      tandem: tandem.createTandem( 'brickStackGroup' ),
      phetioType: PhetioGroupIO( ReferenceIO( ObjectIO ) )
    } );

  // @public {PhetioGroup<MysteryMass>}
  this.mysteryMassGroup = new PhetioGroup( ( tandem, position, mysteryMassId ) => {
      const mysteryMassModelElement = new MysteryMass( position, mysteryMassId, {
        tandem: tandem,
        phetioDynamicElement: true
      } );
      mysteryMassModelElement.animationDestination = position;
      mysteryMassModelElement.userControlledProperty.set( true );
      return mysteryMassModelElement;
    },
    [ Vector2.ZERO, 0 ], {
      tandem: tandem.createTandem( 'mysteryMassGroup' ),
      phetioType: PhetioGroupIO( ReferenceIO( ObjectIO ) )
    } );

  // TODO: Add person group here too, see https://github.com/phetsims/balancing-act/issues/99
}

balancingAct.register( 'BalanceLabModel', BalanceLabModel );

export default inherit( BalanceModel, BalanceLabModel, {

  reset: function() {
    this.massList.clear();
    BalanceModel.prototype.reset.call( this );
  },

  addMass: function( mass ) {
    const self = this;
    BalanceModel.prototype.addMass.call( self, mass );
    mass.userControlledProperty.lazyLink( function( isUserControlled ) {
      if ( !isUserControlled ) {
        // The user has dropped this mass.
        if ( !self.plank.addMassToSurface( mass ) ) {
          // The attempt to add mass to surface of plank failed, probably because the area below the mass is full, or
          // because the mass wasn't over the plank.
          self.removeMassAnimated( mass );
        }
      }
    } );
  },

  removeMassAnimated: function( mass ) {

    const self = this;

    // Register a listener for the completion of the removal animation sequence.
    function removeMass( isAnimating, wasAnimating ) {
      if ( wasAnimating && !isAnimating ) {
        // Animation sequence has completed.
        mass.animatingProperty.unlink( removeMass );
        BalanceModel.prototype.removeMass.call( self, mass );
      }
    }

    mass.animatingProperty.link( removeMass );

    // Kick off the animation back to the toolbox.
    mass.initiateAnimation();
  }
} );
// Copyright 2013-2019, University of Colorado Boulder

/**
 * Type that defines the "Balance Lab" screen.
 */
define( require => {
  'use strict';

  // modules
  const balancingAct = require( 'BALANCING_ACT/balancingAct' );
  const BasicBalanceScreenView = require( 'BALANCING_ACT/common/view/BasicBalanceScreenView' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MassKitSelectionNode = require( 'BALANCING_ACT/common/view/MassKitSelectionNode' );
  const Panel = require( 'SUN/Panel' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const PANEL_X_MARGIN = 5;

  /**
   * @param model
   * @param {Tandem} tandem
   * @constructor
   */
  function BalanceLabView( model, tandem ) {
    BasicBalanceScreenView.call( this, model, tandem );
    const self = this;

    // Add the mass selection carousel.
    this.massKitSelectionNode = new MassKitSelectionNode( model, self.modelViewTransform );
    self.nonMassLayer.addChild( new Panel( new VBox( {
      children: [
        new HStrut( self.controlPanelBounds.width - PANEL_X_MARGIN * 2 ),
        this.massKitSelectionNode ]
    } ), {
      centerX: self.controlPanelBounds.centerX,
      top: self.controlPanelBounds.bottom + 5,
      xMargin: PANEL_X_MARGIN,
      fill: 'rgb( 240, 240, 240 )',
      maxWidth: self.controlPanelBounds.width
    } ) );
  }

  balancingAct.register( 'BalanceLabView', BalanceLabView );

  return inherit( BasicBalanceScreenView, BalanceLabView, {
    reset: function() {
      this.massKitSelectionNode.reset();
      BasicBalanceScreenView.prototype.reset.call( this );
    }
  } );
} );


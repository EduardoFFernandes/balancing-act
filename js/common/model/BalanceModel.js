// Copyright 2002-2013, University of Colorado Boulder

/**
 * Basic model for depicting masses on a balance, meant to be used as a base
 * type.
 *
 * @author John Blanco
 */

define( function( require ) {
  'use strict';

  // Imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var FulcrumAbovePlank = require( 'BALANCING_ACT/common/model/Fulcrum' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Plank = require( 'BALANCING_ACT/common/model/Plank' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var FULCRUM_HEIGHT = 0.85; // In meters.
  var PLANK_HEIGHT = 0.75; // In meters.

  /**
   * @constructor
   */
  function BalanceModel() {

    var thisModel = this;

    // Model elements
    thisModel.fulcrum = new FulcrumAbovePlank( new Dimension2( 1, FULCRUM_HEIGHT ) );
    thisModel.massList = new ObservableArray();
    thisModel.columnState = new Property( 'doubleColumns' ); // Valid values are doubleColumns, singleColumn, noColumn.
    thisModel.plank = new Plank( new Vector2( 0, PLANK_HEIGHT ), new Vector2( 0, FULCRUM_HEIGHT ), this.columnState );
//    thisModel.attachmentBar = new AttachmentBar( thisModel.plank );
    thisModel.supportColumns = [];
  }

  BalanceModel.prototype = {

    // Step function, called by the framework, clocks time-dependent behavior.
    step: function( dt ) {
      this.plank.step( dt );
      this.massList.forEach( function( mass ) {
        mass.step( dt );
      } )
    },

    // Add a mass to the model.  Subclasses generally do additional things.
    addMass: function( mass ) {
      this.massList.push( mass );
    },

    // Remove a mass from the model.  Subclasses generally do additional things.
    removeMass: function( mass ) {
      this.massList = _.without( this.massList, mass );
    },

    reset: function() {
      this.plank.removeAllMasses();
      this.columnState.reset();
    }
  };

  return BalanceModel;
} );
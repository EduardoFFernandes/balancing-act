// Copyright 2013-2020, University of Colorado Boulder

/**
 * ScreenView that displays items in the balance model, primarily the balance beam (i.e. the plank), the various masses,
 * and a floating control panel for controlling the visibility of labels, rulers, etc.
 *
 * @author John Blanco
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import OutsideBackgroundNode from '../../../../scenery-phet/js/OutsideBackgroundNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import Panel from '../../../../sun/js/Panel.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import balancingAct from '../../balancingAct.js';
import balancingActStrings from '../../balancingActStrings.js';
import BASharedConstants from '../BASharedConstants.js';
import PositionIndicatorChoice from '../model/PositionIndicatorChoice.js';
import AttachmentBarNode from './AttachmentBarNode.js';
import ColumnOnOffController from './ColumnOnOffController.js';
import FulcrumNode from './FulcrumNode.js';
import LevelIndicatorNode from './LevelIndicatorNode.js';
import LevelSupportColumnNode from './LevelSupportColumnNode.js';
import MassNodeFactory from './MassNodeFactory.js';
import MysteryVectorNode from './MysteryVectorNode.js';
import PlankNode from './PlankNode.js';
import PositionedVectorNode from './PositionedVectorNode.js';
import PositionIndicatorControlPanel from './PositionIndicatorControlPanel.js';
import PositionMarkerSetNode from './PositionMarkerSetNode.js';
import RotatingRulerNode from './RotatingRulerNode.js';

// strings
const forcesFromObjectsString = balancingActStrings.forcesFromObjects;
const levelString = balancingActStrings.level;
const massLabelsString = balancingActStrings.massLabels;
const showString = balancingActStrings.show;

// constants
const X_MARGIN_IN_PANELS = 5;
const PANEL_TITLE_FONT = new PhetFont( 16 );
const PANEL_OPTION_FONT = { font: new PhetFont( 14 ) };

class BasicBalanceScreenView extends ScreenView {

  /**
   * @param {BalanceModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    super( { layoutBounds: BASharedConstants.LAYOUT_BOUNDS } );
    const self = this;
    self.model = model;

    // Define the properties that control visibility of various display elements.
    self.viewProperties = {
      massLabelsVisibleProperty: new BooleanProperty( true, {
        tandem: tandem.createTandem( 'massLabelsVisibleProperty' )
      } ),
      forceVectorsFromObjectsVisibleProperty: new BooleanProperty( false, {
        tandem: tandem.createTandem( 'forceVectorsFromObjectsVisibleProperty' )
      } ),
      levelIndicatorVisibleProperty: new BooleanProperty( false, {
        tandem: tandem.createTandem( 'levelIndicatorVisibleProperty' )
      } ),
      positionMarkerStateProperty: new EnumerationProperty( PositionIndicatorChoice, PositionIndicatorChoice.NONE, {
        tandem: tandem.createTandem( 'positionMarkerStateProperty' )
      } )
    };

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is on the
    // ground just below the center of the balance, is positioned in the view.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( self.layoutBounds.width * 0.375, self.layoutBounds.height * 0.79 ),
      105 );
    self.modelViewTransform = modelViewTransform; // Make modelViewTransform available to descendant types.

    // Create a root node and send to back so that the layout bounds box can be made visible if needed.
    const root = new Node();
    self.addChild( root );
    root.moveToBack();

    // Add the background, which portrays the sky and ground.
    const skyAndGroundHeight = this.layoutBounds.height * 1.5;
    root.addChild( new OutsideBackgroundNode(
      this.layoutBounds.centerX,
      modelViewTransform.modelToViewY( 0 ),
      this.layoutBounds.width * 2.5,
      skyAndGroundHeight,
      skyAndGroundHeight
    ) );

    // Set up a layer for non-mass model elements.
    self.nonMassLayer = new Node();
    root.addChild( self.nonMassLayer );

    // Set up a separate layer for the masses so that they will be out in front of the other elements of the model.
    const massesLayer = new Node();
    root.addChild( massesLayer );

    function handleMassAdded( addedMass ) {

      // Create and add the view representation for this mass.
      const massNode = MassNodeFactory.createMassNode(
        addedMass,
        modelViewTransform,
        true,
        self.viewProperties.massLabelsVisibleProperty,
        model.columnStateProperty
      );
      massesLayer.addChild( massNode );

      // Move the mass to the front when grabbed so that layering stays reasonable.
      addedMass.userControlledProperty.link( function( userControlled ) {
        if ( userControlled ) {
          massNode.moveToFront();
        }
      } );

      // Add the removal listener for if and when this mass is removed from the model.
      model.massList.addItemRemovedListener( function removalListener( removedMass ) {
        if ( removedMass === addedMass ) {
          massesLayer.removeChild( massNode );
          model.massList.removeItemRemovedListener( removalListener );
        }
      } );
    }

    // Add initial mass representations.
    model.massList.forEach( handleMassAdded );

    // Whenever a mass is added to the model, create a graphic for it.
    model.massList.addItemAddedListener( handleMassAdded );

    // Add graphics for the plank, the fulcrum, the attachment bar, and the columns.
    self.nonMassLayer.addChild( new FulcrumNode( modelViewTransform, model.fulcrum ) );
    const plankNode = new PlankNode( modelViewTransform, model.plank );
    self.nonMassLayer.addChild( plankNode );
    self.nonMassLayer.addChild( new AttachmentBarNode( modelViewTransform, model.plank ) );
    model.supportColumns.forEach( function( supportColumn ) {
      self.nonMassLayer.addChild( new LevelSupportColumnNode(
        modelViewTransform,
        supportColumn,
        model.columnStateProperty
      ) );
    } );

    // Add the ruler.
    const rulersVisibleProperty = new Property( false );
    self.viewProperties.positionMarkerStateProperty.link( function( positionMarkerState ) {
      rulersVisibleProperty.value = positionMarkerState === PositionIndicatorChoice.RULERS;
    } );
    self.nonMassLayer.addChild( new RotatingRulerNode( model.plank, modelViewTransform, rulersVisibleProperty ) );

    // Add the position markers.
    const positionMarkersVisible = new Property( false );
    self.viewProperties.positionMarkerStateProperty.link( function( positionMarkerState ) {
      positionMarkersVisible.value = positionMarkerState === PositionIndicatorChoice.MARKS;
    } );
    self.nonMassLayer.addChild( new PositionMarkerSetNode( model.plank, modelViewTransform, positionMarkersVisible ) );

    // Add the level indicator node which will show whether the plank is balanced or not
    const levelIndicatorNode = new LevelIndicatorNode( modelViewTransform, model.plank );
    self.viewProperties.levelIndicatorVisibleProperty.link( function( visible ) {
      levelIndicatorNode.visible = visible;
    } );
    self.nonMassLayer.addChild( levelIndicatorNode );

    // Listen to the list of force vectors and manage their representations.
    model.plank.forceVectors.addItemAddedListener( function( addedMassForceVector ) {
      // Add a representation for the new vector.
      let forceVectorNode;
      if ( addedMassForceVector.isObfuscated() ) {
        forceVectorNode = new MysteryVectorNode(
          addedMassForceVector.forceVectorProperty,
          self.viewProperties.forceVectorsFromObjectsVisibleProperty,
          modelViewTransform
        );
      }
      else {
        forceVectorNode = new PositionedVectorNode( addedMassForceVector.forceVectorProperty,
          0.23,  // Scaling factor, chosen to make size reasonable.
          self.viewProperties.forceVectorsFromObjectsVisibleProperty,
          modelViewTransform
        );
      }
      self.nonMassLayer.addChild( forceVectorNode );

      // Remove representation when corresponding vector removed from model.
      model.plank.forceVectors.addItemRemovedListener( function( removedMassForceVector ) {
        if ( removedMassForceVector === addedMassForceVector ) {
          self.nonMassLayer.removeChild( forceVectorNode );
        }
      } );
    } );

    // Add the buttons that will control whether or not the support columns are in place.
    const columnControlPanel = new ColumnOnOffController( model.columnStateProperty, {
      center: modelViewTransform.modelToViewPosition( new Vector2( 0, -0.5 ) ),
      tandem: tandem.createTandem( 'columnControlPanel' )
    } );
    self.nonMassLayer.addChild( columnControlPanel );

    // The panels should fit in the space to the right of the plank.
    const maxControlPanelWidth = this.layoutBounds.maxX - plankNode.bounds.maxX - 20;

    // Add the control panel that will allow users to control the visibility of the various indicators.
    const showPanelTandem = tandem.createTandem( 'showPanel' );
    const indicatorVisibilityCheckboxGroup = new VerticalCheckboxGroup( [ {
      node: new Text( massLabelsString, PANEL_OPTION_FONT ),
      property: self.viewProperties.massLabelsVisibleProperty,
      label: massLabelsString,
      tandem: showPanelTandem.createTandem( 'massLabelsCheckbox' )
    }, {
      node: new Text( forcesFromObjectsString, PANEL_OPTION_FONT ),
      property: self.viewProperties.forceVectorsFromObjectsVisibleProperty,
      label: forcesFromObjectsString,
      tandem: showPanelTandem.createTandem( 'forcesFromObjectsCheckbox' )
    }, {
      node: new Text( levelString, PANEL_OPTION_FONT ),
      property: self.viewProperties.levelIndicatorVisibleProperty,
      label: levelString,
      tandem: showPanelTandem.createTandem( 'levelCheckbox' )
    }
    ], {
      checkboxOptions: { boxWidth: 15 },
      spacing: 5,
      tandem: showPanelTandem
    } );
    const titleToControlsVerticalSpace = 7;
    const indicatorVisibilityControlsVBox = new VBox( {
      children: [
        new Text( showString, { font: PANEL_TITLE_FONT } ),
        new VStrut( titleToControlsVerticalSpace ),
        new HBox( { children: [ new HStrut( 10 ), indicatorVisibilityCheckboxGroup ] } )
      ],
      align: 'left'
    } );
    const indicatorVisibilityControlPanel = new Panel( indicatorVisibilityControlsVBox, {
      xMargin: X_MARGIN_IN_PANELS,
      fill: 'rgb( 240, 240, 240 )',
      top: 5,
      right: this.layoutBounds.width - 10,
      maxWidth: maxControlPanelWidth
    } );
    self.nonMassLayer.addChild( indicatorVisibilityControlPanel );

    // Add the control panel that will allow users to select between the various position markers, i.e. ruler, position
    // markers, or nothing.
    const positionControlPanel = new PositionIndicatorControlPanel( self.viewProperties.positionMarkerStateProperty, {
      left: indicatorVisibilityControlPanel.left,
      top: indicatorVisibilityControlPanel.bottom + 5,
      minWidth: indicatorVisibilityControlPanel.width,
      maxWidth: maxControlPanelWidth,
      tandem: tandem.createTandem( 'positionPanel' )
    } );
    self.nonMassLayer.addChild( positionControlPanel );

    // Add bounds for the control panels so that descendant types can see them for layout.
    this.controlPanelBounds = new Bounds2( indicatorVisibilityControlPanel.bounds.minX, positionControlPanel.bounds.minY,
      indicatorVisibilityControlPanel.bounds.maxX, positionControlPanel.bounds.maxY );

    // Reset All button.
    function resetClosure() {
      self.reset();
    }

    self.nonMassLayer.addChild( new ResetAllButton( {
      listener: resetClosure,
      radius: BASharedConstants.RESET_ALL_BUTTON_RADIUS,
      right: indicatorVisibilityControlPanel.right,
      bottom: self.layoutBounds.height - 10,
      tandem: tandem.createTandem( 'resetAllButton' )
    } ) );
  }

  // @public
  reset() {
    this.model.reset();
    _.values( this.viewProperties ).forEach( function( viewProperty ) { viewProperty.reset(); } );
  }
}

balancingAct.register( 'BasicBalanceScreenView', BasicBalanceScreenView );
export default BasicBalanceScreenView;

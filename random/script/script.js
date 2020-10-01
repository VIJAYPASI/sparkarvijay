// These load the modules / tells spark that these will be needed
const Scene = require('Scene');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Patches = require('Patches');
//This is where we need to reference all of our textures, materials and any
//objects we want to be detected and later controlled, make sure you name these
//assets exactly the same as you have within Spark AR, case and all.
Promise.all([
 // Button textures
 Textures.findFirst('1'),
 Textures.findFirst('2'),
 Textures.findFirst('3'),
 Textures.findFirst('4'),

 // Materials for object
 Materials.findFirst('mat1'),
 Materials.findFirst('mat2'),
 Materials.findFirst('mat3'),
 Materials.findFirst('mat4'),

 // This is where we call up the object we want to control / manipulate based
//on picker values later.
 Scene.root.findFirst('faceMesh0'),
]).then(function(results){
 // NativeUI picker buttons value starts at 0 as the default on launch for
//projects is always the value of 0.
 const button1 = results[0];
 const button2 = results[1];
 const button3 = results[2];
 const button4 = results[3];

 // Materials, if you add or remove buttons make sure these values in results
//reflect this.

//Please refer to the material library and docs for proper import

 const matone = results[4];
 const mattwo = results[5];
 const matthree = results[6];
 const matfour = results[7];

 const faceMesh0 = results[8];
 const configuration = {
 //This index references the values of our picker buttons, value is 0 to start
//with so button 1 is active at start.
 selectedIndex: 0,
 // Buttons textures
 items: [
 {image_texture: button1},
 {image_texture: button2},
 {image_texture: button3},
{image_texture: button4},

 ],
 // Materials for object
 mats: [
 {material: matone},
 {material: mattwo},
 {material: matthree},
{material: matfour},
]
 };
 // NativeUI Picker callup
 const picker = NativeUI.picker;
 picker.configure(configuration);
 picker.visible = true;
 picker.selectedIndex.monitor().subscribe(function(index) {
// This tells the object to change the material (mats) to reflect the value picked
(configuration)
 faceMesh0.material = configuration.mats[index.newValue].material
 //Takes the value from the picker so it can be called out later in patch editor
//via patch editor. Make sure you name the From Script option selectedIndex and
//its of type Number. If Picker is not appearing make sure textures are set to No
//Compression and under edit properties > capabilities NativeUI picker is
//enabled. Sometimes saving and reopening the porject can fix issues post this.
 Patches.inputs.setScalar('selectedIndex', index.newValue);

 });
});

import * as THREE from 'three';
import { ITextSprite } from "../../src/shared/interfaces/render/textsprite";
import { Text } from 'troika-three-text'
 
// https://protectwise.github.io/troika/troika-three-text/#usage
export function TroikaTextSprite(textdata: ITextSprite) {
  const myText : Text = new Text()

  // Set properties to configure:
  myText.text = textdata.group + "\n" + textdata.text
  myText.fontSize = 0.2
  myText.position.set(textdata.offset.X, textdata.offset.Y, textdata.offset.Z)
  myText.color = textdata.textColor;
  myText.outlineColor = textdata.borderColor;
  myText.outlineWidth = "5%";
  myText.anchorX = 'center';
  myText.anchorY = 'bottom';
  myText.textAlign = 'center';
  // Update the rendering:
  myText.sync()
  return myText;
}


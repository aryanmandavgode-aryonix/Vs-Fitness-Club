#!/bin/bash
# VS Fitness Club — temporary replaceable imagery (consistent cinematic art direction)
# Generated assets live in /tmp/vsfit-raw then optimized into public/images

set -e
RAW=/tmp/vsfit-raw
mkdir -p $RAW

STYLE="cinematic editorial photograph for a premium dark luxury fitness club, obsidian black environment, charcoal grey tones, dramatic rim lighting, volumetric light haze, deep shadows, moody high contrast professional photography, photorealistic, no text, no watermark, no logo"

case "$1" in
1)
z-ai image -p "wide empty modern gym floor at night, rows of strength machines and power racks fading into darkness, dramatic overhead spotlight beams cutting through light haze, $STYLE" -o $RAW/hero.png -s 1344x768
z-ai image -p "muscular athlete performing heavy dumbbell curl in dark gym, side profile, sweat glistening under single dramatic spotlight, black background, $STYLE" -o $RAW/about-main.png -s 1344x768
z-ai image -p "athlete gripping barbell with chalked hands preparing deadlift, low angle vertical composition, dramatic backlight, dark gym, $STYLE" -o $RAW/about-portrait.png -s 768x1344
z-ai image -p "strength training zone with black power racks loaded barbells and iron plates, moody dark gym interior, single shaft of light, $STYLE" -o $RAW/facility-strength.png -s 1344x768
z-ai image -p "row of treadmills in dark premium gym cardio zone, dramatic linear ceiling lights, empty machines, cinematic depth, $STYLE" -o $RAW/facility-cardio.png -s 1344x768
echo "BATCH1_DONE"
;;
2)
z-ai image -p "functional training turf zone with kettlebells battle ropes and push sled in dark gym, dramatic spotlight, $STYLE" -o $RAW/facility-functional.png -s 1344x768
z-ai image -p "vertical shot of black dumbbell rack with chrome handles catching the light, dark premium gym free weights area, $STYLE" -o $RAW/facility-freeweights.png -s 864x1152
z-ai image -p "wide dark gym interior with symmetrical row of cable machines and mirrors, cinematic one point perspective, $STYLE" -o $RAW/gallery-1.png -s 1344x768
z-ai image -p "athlete performing deadlift with perfectly loaded barbell, side view, dramatic rim light on spine, dark stage like gym, $STYLE" -o $RAW/gallery-2.png -s 768x1344
z-ai image -p "extreme close up of chalked hands gripping knurled steel barbell, dark background, dramatic light, shallow depth of field, $STYLE" -o $RAW/gallery-3.png -s 1152x864
echo "BATCH2_DONE"
;;
3)
z-ai image -p "athlete sitting on bench resting between heavy sets, head down, single dramatic overhead spotlight cone, dark gym, vertical composition, $STYLE" -o $RAW/gallery-4.png -s 768x1344
z-ai image -p "silhouette of athlete doing push ups on dark gym floor against soft haze of backlit mist, dramatic wide shot, $STYLE" -o $RAW/gallery-5.png -s 1344x768
z-ai image -p "stack of black iron weight plates and kettlebells arranged on dark rubber floor, moody still life, dramatic side light, $STYLE" -o $RAW/gallery-6.png -s 1152x864
z-ai image -p "dramatic dark gym corridor with hanging pendant lights and black equipment silhouettes, cinematic wide establishing shot, $STYLE" -o $RAW/og-image.png -s 1344x768
echo "BATCH3_DONE"
;;
*)
echo "usage: gen-images.sh 1|2|3"
;;
esac

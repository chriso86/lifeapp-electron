import themeColors from '@/theme/variables/_colors.scss';
import {hex, hsl} from 'color-convert';
import ColorScheme from 'color-scheme';
import {ArrayHelper} from '@/infra/common/ArrayHelper';
import {HSL} from 'color-convert/conversions';

type ColorSchemeType = 'mono' | 'contrast' | 'triade' |  'tetrade' | 'analogic';
type ColorSchemeVariation = 'pastel' | 'soft' | 'light' | 'hard' | 'pale';
type ColorCorrectionProperty = 'hue' | 'saturation' | 'luminosity';

export class ColorHelper {
	static lightFontColor = '#ffffff';
	static darkFontColor = '#333333';

	static getRandomColor(): string {
		const r = Math.random() * 100;
		const g = Math.random() * 100;
		const b = Math.random() * 100;
		const getCorrectedColorPart = (c: number): string => (c < 10 ? +(c + '' + c) : c > 99 ? c - 1 : c).toString();

		return getCorrectedColorPart(r) + getCorrectedColorPart(g) + getCorrectedColorPart(b);
	}

	static getColorScheme(
		colorHex: string,
		type: ColorSchemeType,
		variation: ColorSchemeVariation
	): string[] {
		const h = hex.hsl(colorHex)[0];
		const scheme = new ColorScheme();

		scheme.from_hue(h)
			.scheme(type)
			.variation(variation);

		return scheme.colors().map((c: string) =>`#${c}`);
	}

	static correctHSL(
		colors: string[],
		property: ColorCorrectionProperty,
		threshold: number,
		incrementation?: number
	): string[] {
		const hslColors = colors.map(c => hex.hsl(c));
		let propertyIndex = 0;

		switch (property) {
			case 'saturation':
				propertyIndex = 1;
				break;
			case 'luminosity':
				propertyIndex = 2;
				break;
		}

		return hslColors.map((color: HSL) => {
			const propertyValue = color[propertyIndex];

			if (propertyValue > threshold) {
				if (incrementation) {
					color[propertyIndex] -= incrementation;
				} else {
					color[propertyIndex] = threshold;
				}
			}

			return hsl.hex(color);
		});
	}

	static getFontColorForBackground(colorHex: string): string {
		if (!colorHex) {
			return '';
		}

		const hsl = hex.hsl(colorHex);
		const luminosity = hsl[2];

		if (luminosity < 55) {
			return this.lightFontColor;
		}

		return this.darkFontColor;
	}

	static generateRandomColorPalette(): string[] {
		const colors: string[] = [];
		let lastColor = themeColors.secondaryColor;

		for(let x = 0; x < 16; x++) {
			const analogScheme = ColorHelper.getColorScheme(lastColor, 'analogic', 'hard');
			let color = ArrayHelper.getRandomItemFromArray(analogScheme);

			if (colors.indexOf(color) > -1) {
				const triadeScheme = ColorHelper.getColorScheme(lastColor, 'triade', 'hard');

				color = ArrayHelper.getRandomItemFromArray(triadeScheme);
			}

			lastColor = color;

			colors.push(color);
		}

		return colors;
	}
}

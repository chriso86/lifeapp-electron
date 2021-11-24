import {Icon} from '@/domain/model/common/Icon';

export class IconMapper {
	static constructIcons(icons: Icon[]): Icon[] {
		return icons.map((icon: Icon) => this.constructIcon(icon));
	}

	static constructIcon(icon: Icon): Icon {
		const mappedIcon = new Icon(
			icon.name,
			icon.path
		);

		if (icon._id) {
			mappedIcon.setId(icon._id);
		}

		return mappedIcon;
	}
}

import {Cell} from '@/domain/model/routine-planner/Cell';
import {Time} from '@/domain/model/common/Time';
import {ActivityMapper} from '@/domain/service/routine-planner/ActivityMapper';

export class CellMapper {
	static constructCells(cells: Cell[]): Cell[] {
		return cells.map((cell: Cell) => CellMapper.constructCell(cell));
	}

	static constructCell(cell: Cell): Cell {
		const time = cell.time;

		const mappedCell = new Cell(
			cell.day,
			new Time(
				time.hour,
				time.minutes
			))

		if (cell.activity) {
			const mappedActivity = ActivityMapper.constructActivity(cell.activity);

			mappedCell.assignActivity(mappedActivity);
		}

		return mappedCell;
	}
}

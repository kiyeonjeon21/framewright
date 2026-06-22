import type SheetObject from '@framewright/core/sheetObjects/SheetObject'
import type {PathToProp} from '@framewright/utils/pathToProp'
import stableValueHash from '@framewright/utils/stableJsonStringify'
import type Sheet from '@framewright/core/sheets/Sheet'
import type {KeyframeId, SequenceTrackId} from '@framewright/core/types/public'
import type {StudioSheetItemKey} from '@framewright/core/types/private'

/**
 * This will not necessarily maintain consistent key values if any
 * versioning happens where something needs to
 */
export const createStudioSheetItemKey = {
  forSheet(): StudioSheetItemKey {
    return 'sheet' as StudioSheetItemKey
  },
  forSheetObject(obj: SheetObject): StudioSheetItemKey {
    return stableValueHash({
      o: obj.address.objectKey,
    }) as StudioSheetItemKey
  },
  forSheetObjectProp(
    obj: SheetObject,
    pathToProp: PathToProp,
  ): StudioSheetItemKey {
    return stableValueHash({
      o: obj.address.objectKey,
      p: pathToProp,
    }) as StudioSheetItemKey
  },
  forTrackKeyframe(
    obj: SheetObject,
    trackId: SequenceTrackId,
    keyframeId: KeyframeId,
  ): StudioSheetItemKey {
    return stableValueHash({
      o: obj.address.objectKey,
      t: trackId,
      k: keyframeId,
    }) as StudioSheetItemKey
  },
  forSheetObjectAggregateKeyframe(
    obj: SheetObject,
    position: number,
  ): StudioSheetItemKey {
    return createStudioSheetItemKey.forCompoundPropAggregateKeyframe(
      obj,
      [],
      position,
    )
  },
  forSheetAggregateKeyframe(obj: Sheet, position: number): StudioSheetItemKey {
    return stableValueHash({
      o: obj.address.sheetId,
      pos: position,
    }) as StudioSheetItemKey
  },
  forCompoundPropAggregateKeyframe(
    obj: SheetObject,
    pathToProp: PathToProp,
    position: number,
  ): StudioSheetItemKey {
    return stableValueHash({
      o: obj.address.objectKey,
      p: pathToProp,
      pos: position,
    }) as StudioSheetItemKey
  },
}

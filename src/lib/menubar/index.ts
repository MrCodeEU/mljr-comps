import Root from './Menubar.svelte';
import Content from './MenubarContent.svelte';
import { Menubar as BitsMenubar } from 'bits-ui';

export const Menubar = {
	Root,
	Content,
	Menu: BitsMenubar.Menu,
	Trigger: BitsMenubar.Trigger,
	Portal: BitsMenubar.Portal,
	Item: BitsMenubar.Item,
	Group: BitsMenubar.Group,
	SubContent: BitsMenubar.SubContent,
	SubTrigger: BitsMenubar.SubTrigger,
	RadioGroup: BitsMenubar.RadioGroup,
	RadioItem: BitsMenubar.RadioItem,
	CheckboxItem: BitsMenubar.CheckboxItem,
	Sub: BitsMenubar.Sub,
	Separator: BitsMenubar.Separator,
	Arrow: BitsMenubar.Arrow
};

export type {
	MenubarRootProps,
	MenubarMenuProps,
	MenubarTriggerProps,
	MenubarContentProps,
	MenubarItemProps,
	MenubarGroupProps,
	MenubarRadioGroupProps,
	MenubarRadioItemProps,
	MenubarCheckboxItemProps,
	MenubarSubPropsWithoutHTML,
	MenubarSubTriggerProps,
	MenubarSubContentProps
} from 'bits-ui';

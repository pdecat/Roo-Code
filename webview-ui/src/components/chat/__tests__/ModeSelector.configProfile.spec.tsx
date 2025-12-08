import { render, screen, fireEvent } from "@/utils/test-utils"

import type { ModeConfig } from "@roo-code/types"

import type { Mode } from "@roo/modes"

import { ModeSelector } from "../ModeSelector"

vi.mock("@/utils/vscode", () => ({
	vscode: {
		postMessage: vi.fn(),
	},
}))

vi.mock("@/context/ExtensionStateContext", () => ({
	useExtensionState: () => ({
		hasOpenedModeSelector: false,
		setHasOpenedModeSelector: vi.fn(),
	}),
}))

vi.mock("@/i18n/TranslationContext", () => ({
	useAppTranslation: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock("@/components/ui/hooks/useRooPortal", () => ({
	useRooPortal: () => document.body,
}))

vi.mock("@/utils/TelemetryClient", () => ({
	telemetryClient: {
		capture: vi.fn(),
	},
}))

// Create a variable to control what getAllModes returns.
let mockModes: ModeConfig[] = []

vi.mock("@roo/modes", async () => {
	const actual = await vi.importActual<typeof import("@roo/modes")>("@roo/modes")
	return {
		...actual,
		getAllModes: () => mockModes,
		defaultModeSlug: "code",
	}
})

describe("ModeSelector - Config Profile Display", () => {
	test("displays config profile name next to mode when modeApiConfigs and listApiConfigMeta are provided", () => {
		mockModes = [
			{
				slug: "code",
				name: "Code",
				description: "Write code",
				roleDefinition: "Role definition",
				groups: ["read", "edit"],
			},
			{
				slug: "architect",
				name: "Architect",
				description: "Design systems",
				roleDefinition: "Role definition",
				groups: ["read"],
			},
		]

		const modeApiConfigs = {
			code: "config-1",
			architect: "config-2",
		}

		const listApiConfigMeta = [
			{ id: "config-1", name: "OpenAI Config", modelId: "gpt-4" },
			{ id: "config-2", name: "Anthropic Config", modelId: "claude-3-opus" },
		]

		render(
			<ModeSelector
				title="Mode Selector"
				value={"code" as Mode}
				onChange={vi.fn()}
				modeShortcutText="Ctrl+M"
				modeApiConfigs={modeApiConfigs}
				listApiConfigMeta={listApiConfigMeta}
			/>,
		)

		// Click to open the popover.
		fireEvent.click(screen.getByTestId("mode-selector-trigger"))

		// Should display config profile names next to modes.
		const configNames = screen.getAllByTestId("mode-config-name")
		expect(configNames).toHaveLength(2)
		expect(configNames[0]).toHaveTextContent("OpenAI Config")
		expect(configNames[1]).toHaveTextContent("Anthropic Config")
	})

	test("does not display config name when modeApiConfigs is not provided", () => {
		mockModes = [
			{
				slug: "code",
				name: "Code",
				description: "Write code",
				roleDefinition: "Role definition",
				groups: ["read", "edit"],
			},
		]

		render(
			<ModeSelector title="Mode Selector" value={"code" as Mode} onChange={vi.fn()} modeShortcutText="Ctrl+M" />,
		)

		// Click to open the popover.
		fireEvent.click(screen.getByTestId("mode-selector-trigger"))

		// Should not display config name.
		expect(screen.queryByTestId("mode-config-name")).not.toBeInTheDocument()
	})

	test("does not display config name when mode has no config assigned", () => {
		mockModes = [
			{
				slug: "code",
				name: "Code",
				description: "Write code",
				roleDefinition: "Role definition",
				groups: ["read", "edit"],
			},
			{
				slug: "architect",
				name: "Architect",
				description: "Design systems",
				roleDefinition: "Role definition",
				groups: ["read"],
			},
		]

		const modeApiConfigs = {
			code: "config-1",
			// architect has no config assigned
		}

		const listApiConfigMeta = [{ id: "config-1", name: "OpenAI Config", modelId: "gpt-4" }]

		render(
			<ModeSelector
				title="Mode Selector"
				value={"code" as Mode}
				onChange={vi.fn()}
				modeShortcutText="Ctrl+M"
				modeApiConfigs={modeApiConfigs}
				listApiConfigMeta={listApiConfigMeta}
			/>,
		)

		// Click to open the popover.
		fireEvent.click(screen.getByTestId("mode-selector-trigger"))

		// Should only display one config name (for code mode).
		const configNames = screen.getAllByTestId("mode-config-name")
		expect(configNames).toHaveLength(1)
		expect(configNames[0]).toHaveTextContent("OpenAI Config")
	})
})

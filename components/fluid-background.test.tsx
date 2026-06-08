import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { BLOB_GEOMETRY_DETAIL, FluidBackground } from "./fluid-background"

vi.mock("@react-three/fiber", () => ({
  Canvas: () => <div data-testid="fiber-canvas" />,
  useFrame: () => undefined,
  useThree: () => ({
    pointer: { x: 0, y: 0 },
    viewport: { width: 10, height: 10 }
  })
}))

describe("FluidBackground", () => {
  it("renders a fixed decorative canvas behind the content", () => {
    render(<FluidBackground />)

    const background = screen.getByTestId("fluid-background")

    expect(background).toHaveAttribute("aria-hidden", "true")
    expect(background).toHaveClass("pointer-events-none", "fixed", "inset-0")
    expect(screen.getByTestId("fiber-canvas")).toBeInTheDocument()
  })

  it("keeps the fluid blob geometry lightweight enough for a fixed background", () => {
    expect(BLOB_GEOMETRY_DETAIL).toBeLessThanOrEqual(4)
  })
})

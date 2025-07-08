import {
  getResponsiveImagePath,
  createResponsiveImage,
  getBreakpoint,
  generateSrcSet,
  generateSizes,
} from "../index";

describe("Responsive Image Utils", () => {
  describe("getResponsiveImagePath", () => {
    it("should generate correct mobile image path", () => {
      const path = getResponsiveImagePath("/images/sections/mv/hero", "mobile");
      expect(path).toBe("/images/sections/mv/hero-mobile.webp");
    });

    it("should generate correct tablet image path", () => {
      const path = getResponsiveImagePath("/images/sections/mv/hero", "tablet");
      expect(path).toBe("/images/sections/mv/hero-tablet.webp");
    });

    it("should generate correct desktop image path", () => {
      const path = getResponsiveImagePath(
        "/images/sections/mv/hero",
        "desktop"
      );
      expect(path).toBe("/images/sections/mv/hero-desktop.webp");
    });

    it("should use custom extension", () => {
      const path = getResponsiveImagePath(
        "/images/sections/mv/hero",
        "mobile",
        "png"
      );
      expect(path).toBe("/images/sections/mv/hero-mobile.png");
    });
  });

  describe("createResponsiveImage", () => {
    it("should create responsive image object", () => {
      const responsiveImage = createResponsiveImage(
        "/images/sections/mv/hero",
        "Hero image"
      );

      expect(responsiveImage).toEqual({
        mobile: "/images/sections/mv/hero-mobile.webp",
        tablet: "/images/sections/mv/hero-tablet.webp",
        desktop: "/images/sections/mv/hero-desktop.webp",
        alt: "Hero image",
      });
    });

    it("should use custom extension", () => {
      const responsiveImage = createResponsiveImage(
        "/images/sections/mv/hero",
        "Hero image",
        "png"
      );

      expect(responsiveImage).toEqual({
        mobile: "/images/sections/mv/hero-mobile.png",
        tablet: "/images/sections/mv/hero-tablet.png",
        desktop: "/images/sections/mv/hero-desktop.png",
        alt: "Hero image",
      });
    });
  });

  describe("getBreakpoint", () => {
    it("should return mobile for width <= 640", () => {
      expect(getBreakpoint(320)).toBe("mobile");
      expect(getBreakpoint(640)).toBe("mobile");
    });

    it("should return tablet for width 641-1024", () => {
      expect(getBreakpoint(641)).toBe("tablet");
      expect(getBreakpoint(768)).toBe("tablet");
      expect(getBreakpoint(1024)).toBe("tablet");
    });

    it("should return desktop for width > 1024", () => {
      expect(getBreakpoint(1025)).toBe("desktop");
      expect(getBreakpoint(1920)).toBe("desktop");
    });
  });

  describe("generateSrcSet", () => {
    it("should generate correct srcset string", () => {
      const responsiveImage = {
        mobile: "/images/sections/mv/hero-mobile.webp",
        tablet: "/images/sections/mv/hero-tablet.webp",
        desktop: "/images/sections/mv/hero-desktop.webp",
        alt: "Hero image",
      };

      const srcSet = generateSrcSet(responsiveImage);
      expect(srcSet).toBe(
        "/images/sections/mv/hero-mobile.webp 640w, /images/sections/mv/hero-tablet.webp 1024w, /images/sections/mv/hero-desktop.webp 1920w"
      );
    });
  });

  describe("generateSizes", () => {
    it("should generate sizes with all breakpoints", () => {
      const sizes = {
        mobile: "100vw",
        tablet: "50vw",
        desktop: "33vw",
      };

      const sizesAttr = generateSizes(sizes);
      expect(sizesAttr).toBe(
        "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      );
    });

    it("should generate sizes with partial breakpoints", () => {
      const sizes = {
        mobile: "100vw",
        desktop: "50vw",
      };

      const sizesAttr = generateSizes(sizes);
      expect(sizesAttr).toBe("(max-width: 640px) 100vw, 50vw");
    });

    it("should handle empty sizes", () => {
      const sizesAttr = generateSizes({});
      expect(sizesAttr).toBe("");
    });
  });
});

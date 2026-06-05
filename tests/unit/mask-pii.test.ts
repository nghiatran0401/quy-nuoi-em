import { describe, expect, it } from "vitest";
import {
  maskEmail,
  maskPersonName,
  maskPhoneDigits,
  maskTransactionDetail,
} from "@/lib/privacy/mask-pii";

describe("maskPersonName", () => {
  it("masks each word like the donors directory", () => {
    expect(maskPersonName("Trương Thị Diệu Quyên")).toBe("T***** T** D*** Q****");
    expect(maskPersonName("(Bác) Nguyễn Hữu Tài")).toBe("(B**) N***** H** T**");
  });
});

describe("maskEmail", () => {
  it("keeps first two local characters and full domain", () => {
    expect(maskEmail("lakietvan91@gmail.com")).toBe("la*********@gmail.com");
    expect(maskEmail("nd@gmail.com")).toBe("nd****@gmail.com");
  });
});

describe("maskPhoneDigits", () => {
  it("shows only the last three digits", () => {
    expect(maskPhoneDigits("0906688433")).toBe("*******433");
    expect(maskPhoneDigits("0973333660")).toBe("*******660");
  });
});

describe("maskTransactionDetail", () => {
  it("masks email, phone, and donor names in transfer descriptions", () => {
    const input =
      "999405.011024.002024.ck chuyen khoan nuoi em nuoi tiep Nguyen Huy Son FT24275427033466";
    expect(maskTransactionDetail(input)).toContain("N***** H** S**");
    expect(maskTransactionDetail(input)).toContain("FT24275427033466");
  });

  it("masks inline email and phone patterns", () => {
    const input =
      "lakietvan91@gmail.com - 0906688433 - NE1146";
    const masked = maskTransactionDetail(input);
    expect(masked).toContain("la*********@gmail.com");
    expect(masked).toContain("*******433");
    expect(masked).toContain("NE1146");
  });

  it("masks names in parenthetical contact notes", () => {
    const input = "Dao Van Anh (Sdt: 0973333660,Email vananhdao116@gmail.com)";
    const masked = maskTransactionDetail(input);
    expect(masked).toContain("D** V** A**");
    expect(masked).toContain("*******660");
    expect(masked).toContain("va**********@gmail.com");
  });

  it("masks ALL CAPS donor names after NE codes", () => {
    const input = "999405.011024.002024.ck chuyen khoan nuoi em NE07218 BUI TRONG NGHIA";
    expect(maskTransactionDetail(input)).toContain("B** T**** N****");
  });

  it("leaves public recipient names unmasked", () => {
    const input =
      "khanhlinh.nh@gmail.com 0902702588.CT tu 0071000800088 NGUYEN HUYNH KHANH LINH toi 0711000280294 HOANG HOA TRUNG";
    const masked = maskTransactionDetail(input);
    expect(masked).toContain("HOANG HOA TRUNG");
    expect(masked).toContain("N***** H**** K**** L***");
  });
});

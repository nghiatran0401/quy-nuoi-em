import { BankTransferPanel } from "@/components/shared/bank-transfer-panel";
import { ThienNguyenProfileSection } from "@/components/shared/thien-nguyen-profile-section";
import type { DonateInfoContent } from "@/lib/data/donate-info";

type FaqBankPanelProps = {
  bank: DonateInfoContent;
  donateQrUrl: string;
};

export function FaqBankPanel({ bank, donateQrUrl }: FaqBankPanelProps) {
  return (
    <div className="mt-2">
      <BankTransferPanel
        bank={bank}
        donateQrUrl={donateQrUrl}
        variant="embedded"
        embeddedAddon={
          <ThienNguyenProfileSection variant="embedded" showStatementsLink={false} showMonthlyReportsLink={false} />
        }
      />
    </div>
  );
}

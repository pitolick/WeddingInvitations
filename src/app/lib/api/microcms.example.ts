/**
 * @description microCMS SDK使用例
 * @author WeddingInvitations
 * @since 1.0.0
 */

import {
  getGuestByInvitationId,
  getDearBlockData,
  getGuests,
  getGuestsByInviteType,
} from './microcms';
import { GuestContent } from '../types';

/**
 * @description DearBlockコンポーネントでの使用例
 * @example
 * // DearBlock.tsx
 * const DearBlock: React.FC<DearBlockProps> = ({ invitationId }) => {
 *   const [dearBlockData, setDearBlockData] = useState<DearBlockData | null>(null);
 *   const [loading, setLoading] = useState(true);
 *
 *   useEffect(() => {
 *     const fetchData = async () => {
 *       try {
 *         const data = await getDearBlockData(invitationId);
 *         setDearBlockData(data);
 *       } catch (error) {
 *         console.error('Failed to fetch guest data:', error);
 *       } finally {
 *         setLoading(false);
 *       }
 *     };
 *
 *     fetchData();
 *   }, [invitationId]);
 *
 *   if (loading) return <div>読み込み中...</div>;
 *   if (!dearBlockData) return <div>招待者情報が見つかりません</div>;
 *
 *   return (
 *     <div>
 *       <h3>Dear {dearBlockData.dear}</h3>
 *       <div dangerouslySetInnerHTML={{ __html: dearBlockData.message }} />
 *       <p>招待種別: {dearBlockData.inviteTypes.join(', ')}</p>
 *     </div>
 *   );
 * };
 */

/**
 * @description 招待者情報取得の使用例
 */
export async function exampleUsage() {
  // 1. 特定の招待者情報を取得
  const guest = await getGuestByInvitationId('test');
  if (guest) {
    console.log('招待者名:', guest.name);
    console.log('Dear:', guest.dear);
    console.log('メッセージ:', guest.message);
    console.log('招待種別:', guest.invite);
  }

  // 2. DearBlockData形式で取得
  const dearBlockData = await getDearBlockData('test');
  if (dearBlockData) {
    console.log('DearBlockData:', dearBlockData);
  }

  // 3. 複数の招待者を取得
  const allGuests = await getGuests();
  console.log('全招待者数:', allGuests.length);

  // 4. 招待種別で検索
  const ceremonyGuests = await getGuestsByInviteType('挙式');
  console.log('挙式招待者数:', ceremonyGuests.length);

  const receptionGuests = await getGuestsByInviteType('披露宴');
  console.log('披露宴招待者数:', receptionGuests.length);

  const afterPartyGuests = await getGuestsByInviteType('二次会');
  console.log('二次会招待者数:', afterPartyGuests.length);
}

/**
 * @description エラーハンドリングの例
 */
export async function exampleWithErrorHandling() {
  try {
    const guest = await getGuestByInvitationId('non-existent-id');

    if (!guest) {
      console.log('招待者情報が見つかりません');
      return;
    }

    console.log('招待者情報取得成功:', guest.name);
  } catch (error) {
    console.error('API呼び出しエラー:', error);
  }
}

/**
 * @description 型安全な使用例
 */
export function typeSafeExample() {
  // GuestContentの型チェック（部分的な例）
  const guestPartial: Partial<GuestContent> = {
    name: 'テスト招待者',
    dear: 'テスト招待者様',
    message: 'テストメッセージ' as TrustedHTML,
    invite: ['挙式', '披露宴'],
  };

  console.log('型安全な招待者情報（部分）:', guestPartial);
}

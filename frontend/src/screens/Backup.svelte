<script>
  /* eslint-disable @typescript-eslint/no-unused-vars -- generated imports, matched generously */
  import { Card, Icon, Label } from "@/lib/ui";
  import { brand } from "@/lib/brand";
  import { useNavigate } from "@/lib/navigate";

  const navigate = useNavigate();

  // ---- Local note store (this browser only) -------------------------------
  const notes = [
    {
      id: 'nt_7a31',
      text: 'Kalsubai trek — leave Bari village by 4:30am. Ravi has the jeep; headlamps are in the blue bag.',
      created_at: '2026-11-10T06:12:00',
      updated_at: '2026-11-10T07:48:00',
      checklist_items: [
        { id: 'ci_9011', note_id: 'nt_7a31', text: 'Confirm jeep with Ravi', checked: true, position: 1 },
        { id: 'ci_9012', note_id: 'nt_7a31', text: 'Charge both headlamps', checked: false, position: 2 },
        { id: 'ci_9013', note_id: 'nt_7a31', text: 'Pack 2L water + ORS sachets', checked: false, position: 3 }
      ]
    },
    {
      id: 'nt_6f09',
      text: 'Standup 09:15 — rate limit still bites on the notes sync. Meera to pull nginx logs before Thursday.',
      created_at: '2026-11-09T09:21:00',
      updated_at: '2026-11-09T09:40:00',
      checklist_items: [
        { id: 'ci_8820', note_id: 'nt_6f09', text: 'Ask Meera for the nginx log window', checked: true, position: 1 },
        { id: 'ci_8821', note_id: 'nt_6f09', text: 'Draft retry note for the release email', checked: false, position: 2 }
      ]
    },
    {
      id: 'nt_5c88',
      text: 'Dadar market list — go before 8, the dal counter runs out.',
      created_at: '2026-11-08T18:03:00',
      updated_at: '2026-11-09T20:12:00',
      checklist_items: [
        { id: 'ci_8701', note_id: 'nt_5c88', text: '1kg toor dal', checked: true, position: 1 },
        { id: 'ci_8702', note_id: 'nt_5c88', text: 'Curry leaves', checked: true, position: 2 },
        { id: 'ci_8703', note_id: 'nt_5c88', text: 'Coconut oil 500ml', checked: false, position: 3 },
        { id: 'ci_8704', note_id: 'nt_5c88', text: 'Idli rava', checked: false, position: 4 }
      ]
    },
    {
      id: 'nt_5b02',
      text: "Landlord's receipt for November rent is in the drawer under the router box. Cheque no. 448213.",
      created_at: '2026-11-08T11:30:00',
      updated_at: '2026-11-08T11:30:00',
      checklist_items: []
    },
    {
      id: 'nt_4e77',
      text: "Call Dr. Shah's clinic after 4pm — move Dad's follow-up to the 19th.",
      created_at: '2026-11-07T14:02:00',
      updated_at: '2026-11-07T16:44:00',
      checklist_items: [
        { id: 'ci_8410', note_id: 'nt_4e77', text: 'Reschedule to 19 Nov', checked: false, position: 1 },
        { id: 'ci_8411', note_id: 'nt_4e77', text: 'Pick up the BP monitor cuff', checked: false, position: 2 }
      ]
    },
    {
      id: 'nt_49a1',
      text: 'Diwali gifts — wrap everything Saturday night.',
      created_at: '2026-11-05T21:15:00',
      updated_at: '2026-11-06T08:02:00',
      checklist_items: [
        { id: 'ci_8300', note_id: 'nt_49a1', text: 'Kaju katli — Sharma uncle', checked: true, position: 1 },
        { id: 'ci_8301', note_id: 'nt_49a1', text: 'Sketchbook — Niharika', checked: true, position: 2 },
        { id: 'ci_8302', note_id: 'nt_49a1', text: 'Chess set — Arjun', checked: false, position: 3 },
        { id: 'ci_8303', note_id: 'nt_49a1', text: 'Shawl — Aai', checked: true, position: 4 },
        { id: 'ci_8304', note_id: 'nt_49a1', text: 'Card for the watchman', checked: false, position: 5 }
      ]
    },
    {
      id: 'nt_43b5',
      text: 'Filter coffee, the way Paati made it: 1 part chicory to 4 parts peaberry, water just off the boil, decoction left overnight.',
      created_at: '2026-11-04T07:55:00',
      updated_at: '2026-11-04T07:55:00',
      checklist_items: []
    },
    {
      id: 'nt_3d10',
      text: 'Flat 402 handover — meet the agent at 11, carry the society file.',
      created_at: '2026-11-02T13:20:00',
      updated_at: '2026-11-03T10:05:00',
      checklist_items: [
        { id: 'ci_8100', note_id: 'nt_3d10', text: 'Meter reading photo', checked: true, position: 1 },
        { id: 'ci_8101', note_id: 'nt_3d10', text: 'Key count — 6', checked: true, position: 2 },
        { id: 'ci_8102', note_id: 'nt_3d10', text: 'Society NOC copy', checked: false, position: 3 }
      ]
    },
    {
      id: 'nt_38c4',
      text: "Books to hunt for at Blossom: 'The Mirror and the Light', 'Em and the Big Hoom', anything by Perumal Murugan.",
      created_at: '2026-10-28T19:40:00',
      updated_at: '2026-10-30T12:10:00',
      checklist_items: [
        { id: 'ci_7900', note_id: 'nt_38c4', text: 'Em and the Big Hoom', checked: true, position: 1 },
        { id: 'ci_7901', note_id: 'nt_38c4', text: 'Poonachi — Perumal Murugan', checked: false, position: 2 }
      ]
    },
    {
      id: 'nt_2f6b',
      text: 'Bike service — chain slips under load, front brake squeals in the rain. Quote was ₹2,480 at Shree Motors.',
      created_at: '2026-10-21T10:12:00',
      updated_at: '2026-10-21T10:12:00',
      checklist_items: []
    },
    {
      id: 'nt_1a95',
      text: 'Term insurance renewal — premium due 3 January, do not leave it to the last week.',
      created_at: '2026-10-09T09:00:00',
      updated_at: '2026-10-14T17:22:00',
      checklist_items: [
        { id: 'ci_7500', note_id: 'nt_1a95', text: 'Compare HDFC vs ICICI cover', checked: true, position: 1 },
        { id: 'ci_7501', note_id: 'nt_1a95', text: 'Upload Form 16', checked: false, position: 2 },
        { id: 'ci_7502', note_id: 'nt_1a95', text: 'Check nominee details', checked: false, position: 3 },
        { id: 'ci_7503', note_id: 'nt_1a95', text: 'Set a reminder for 3 Jan', checked: false, position: 4 }
      ]
    },
    {
      id: 'nt_0c21',
      text: 'Goa notes — Mandrem over Arambol, the bakery behind the church opens at 7, the ferry from Chorão is free.',
      created_at: '2026-08-14T16:35:00',
      updated_at: '2026-08-16T09:04:00',
      checklist_items: [
        { id: 'ci_7100', note_id: 'nt_0c21', text: 'Return the snorkel', checked: true, position: 1 },
        { id: 'ci_7101', note_id: 'nt_0c21', text: 'Share photos with Ketaki', checked: true, position: 2 },
        { id: 'ci_7102', note_id: 'nt_0c21', text: 'Review the homestay', checked: false, position: 3 },
        { id: 'ci_7103', note_id: 'nt_0c21', text: 'Expense split with Nikhil', checked: true, position: 4 }
      ]
    }
  ];

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function fmtDate(d) {
    return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  function fmtTime(d) {
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  const noteCount = notes.length;
  const allItems = notes.flatMap((n) => n.checklist_items);
  const itemCount = allItems.length;
  const tickedCount = allItems.filter((i) => i.checked).length;
  const sortedDates = notes.map((n) => new Date(n.created_at)).sort((a, b) => a - b);
  const oldestLabel = fmtDate(sortedDates[0]);
  const newestLabel = fmtDate(sortedDates[sortedDates.length - 1]);

  // ---- State ---------------------------------------------------------------
  let exportState = $state('idle'); // idle | working | done | blocked
  let lastExport = $state(null); // { filename, size, at }
  let exportPanelIn = $state(false);

  let chosenFile = $state(null);
  let chosenName = $state('');
  let importState = $state('idle'); // idle | nofile | reading | invalid | done
  let importedCount = $state(0);
  let importPanelIn = $state(false);

  let online = $state(true);
  const timers = [];

  $effect(() => {
    online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const up = () => (online = true);
    const down = () => (online = false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  });

  $effect(() => {
    return () => timers.forEach((t) => clearTimeout(t));
  });

  function after(ms, fn) {
    timers.push(setTimeout(fn, ms));
  }

  function reveal(which) {
    if (which === 'export') {
      exportPanelIn = false;
      requestAnimationFrame(() => (exportPanelIn = true));
    } else {
      importPanelIn = false;
      requestAnimationFrame(() => (importPanelIn = true));
    }
  }

  function buildPayload() {
    return {
      format: 'notes.export',
      version: 1,
      exported_at: new Date().toISOString(),
      notes: notes.map((n) => ({
        id: n.id,
        text: n.text,
        created_at: n.created_at,
        updated_at: n.updated_at,
        checklist_items: n.checklist_items.map((i) => ({
          id: i.id,
          note_id: i.note_id,
          text: i.text,
          checked: i.checked,
          position: i.position
        }))
      }))
    };
  }

  function exportNotes() {
    if (noteCount === 0 || exportState === 'working') return;
    exportState = 'working';
    reveal('export');
    after(450, () => {
      const json = JSON.stringify(buildPayload(), null, 2);
      const now = new Date();
      const filename = `notes-backup-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.json`;
      try {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        lastExport = {
          filename,
          size: `${(json.length / 1024).toFixed(1)} KB`,
          at: `${fmtDate(now)} · ${fmtTime(now)}`
        };
        exportState = 'done';
      } catch (err) {
        exportState = 'blocked';
      }
      reveal('export');
    });
  }

  function onFileChange(event) {
    const f = event.currentTarget.files && event.currentTarget.files[0];
    if (f) {
      chosenFile = f;
      chosenName = f.name;
      importState = 'idle';
      importPanelIn = false;
    }
  }

  function importNotes() {
    if (!chosenFile) {
      importState = 'nofile';
      reveal('import');
      return;
    }
    importState = 'reading';
    reveal('import');
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const list = Array.isArray(parsed) ? parsed : parsed && parsed.notes;
        const valid =
          Array.isArray(list) &&
          list.length > 0 &&
          list.every((n) => n && typeof n.text === 'string' && typeof n.id === 'string');
        if (!valid) throw new Error('not a notes export');
        importedCount = list.length;
        importState = 'done';
        reveal('import');
        after(800, () => navigate('notes'));
      } catch (err) {
        importState = 'invalid';
        reveal('import');
      }
    };
    reader.onerror = () => {
      importState = 'invalid';
      reveal('import');
    };
    reader.readAsText(chosenFile);
  }

  const mono = 'font-variant-numeric: tabular-nums;';
  const btn =
    'relative inline-flex min-h-[48px] w-full items-center justify-center gap-3 border-[3px] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform duration-150 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[4px] motion-reduce:transition-none motion-reduce:transform-none';
  const lift =
    'hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[6px] active:translate-y-[6px] disabled:translate-x-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60';
</script>

<div
  class="min-h-full w-full"
  style="background-color: {brand.backgroundColor}; color: {brand.primaryColor}; font-family: {brand.fontBody};"
>
  <div class="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 md:px-8 md:py-16">
    <!-- Masthead ------------------------------------------------------- -->
    <header class="mb-12 md:mb-16">
      <p class="text-[11px] uppercase tracking-[0.22em]" style="color: {brand.neutralColor};">
        This browser only — no account
      </p>
      <h1
        data-wf="b-0-0"
        class="mt-3 text-[2.6rem] leading-[1.02] sm:text-5xl md:text-6xl"
        style="font-family: {brand.fontHeading}; letter-spacing: -0.015em;"
      >
        Backup &amp; About
      </h1>
      <div class="mt-6 h-[3px] w-full" style="background-color: {brand.primaryColor};"></div>
      <div class="mt-[3px] h-[3px] w-5/12" style="background-color: {brand.accentColor};"></div>
      <div
        class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.16em]"
        style="color: {brand.neutralColor}; {mono}"
      >
        <span class="inline-flex items-center gap-2">
          <Icon name={online ? 'CheckCircle' : 'AlertCircle'} class="h-3.5 w-3.5" aria-hidden="true" />
          {online ? 'Online — still saved on this device' : 'Offline — everything on this page still works'}
        </span>
        <span>{noteCount} notes · {itemCount} checklist items</span>
      </div>
    </header>

    <!-- 01 / EXPORT ----------------------------------------------------- -->
    <section
      aria-labelledby="sec-export"
      class="mb-12 border-[3px] bg-white p-5 sm:p-8 md:mb-16"
      style="border-color: {brand.primaryColor}; box-shadow: 6px 6px 0 {brand.primaryColor};"
    >
      <div class="flex items-baseline gap-4 border-b-[3px] pb-4" style="border-color: {brand.primaryColor};">
        <span class="text-3xl leading-none md:text-4xl" style="font-family: {brand.fontHeading}; {mono}">01</span>
        <h2 id="sec-export" class="text-[12px] font-semibold uppercase tracking-[0.24em]">Export</h2>
      </div>

      <p data-wf="b-1-0" class="mt-7 max-w-[62ch] text-[15px] leading-[1.65]">
        Export writes all 12 notes, with their checklist items and tick states, into one JSON file you can keep as a
        backup.
      </p>

      <dl class="mt-7 grid grid-cols-2 border-t border-dashed md:grid-cols-4" style="border-color: {brand.neutralColor}44;">
        <div class="border-b border-dashed py-4 pr-4 md:border-b-0" style="border-color: {brand.neutralColor}44;">
          <dt class="text-[10px] uppercase tracking-[0.18em]" style="color: {brand.neutralColor};">Notes</dt>
          <dd class="mt-1 text-2xl" style="font-family: {brand.fontHeading}; {mono}">{noteCount}</dd>
        </div>
        <div class="border-b border-dashed py-4 pl-4 md:border-b-0 md:pl-4" style="border-color: {brand.neutralColor}44;">
          <dt class="text-[10px] uppercase tracking-[0.18em]" style="color: {brand.neutralColor};">Checklist items</dt>
          <dd class="mt-1 text-2xl" style="font-family: {brand.fontHeading}; {mono}">{itemCount}</dd>
        </div>
        <div class="py-4 pr-4 md:pl-4">
          <dt class="text-[10px] uppercase tracking-[0.18em]" style="color: {brand.neutralColor};">Ticked</dt>
          <dd class="mt-1 text-2xl" style="font-family: {brand.fontHeading}; {mono}">{tickedCount}</dd>
        </div>
        <div class="py-4 pl-4">
          <dt class="text-[10px] uppercase tracking-[0.18em]" style="color: {brand.neutralColor};">Span</dt>
          <dd class="mt-1 text-[13px] leading-snug" style="{mono}">{oldestLabel}<br />→ {newestLabel}</dd>
        </div>
      </dl>

      <div class="mt-8 grid grid-cols-12 gap-x-6 gap-y-5">
        <div class="col-span-12 md:col-span-5">
          <div class="relative">
            <span
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px]"
              style="background-color: {brand.primaryColor};"
            ></span>
            <button
              data-wf="b-2-0"
              type="button"
              onclick={exportNotes}
              disabled={exportState === 'working' || noteCount === 0}
              aria-busy={exportState === 'working'}
              class="{btn} {lift}"
              style="background-color: {brand.accentColor}; border-color: {brand.primaryColor}; color: {brand.backgroundColor}; outline-color: {brand.primaryColor};"
            >
              {#if exportState === 'working'}
                <span class="h-3 w-3 animate-pulse motion-reduce:animate-none" style="background-color: currentColor;"></span>
                Writing backup…
              {:else}
                <Icon name="Download" class="h-4 w-4" aria-hidden="true" />
                Export notes (JSON)
              {/if}
            </button>
          </div>
          {#if noteCount === 0}
            <p class="mt-4 text-xs leading-relaxed" style="color: {brand.neutralColor};">
              There is nothing to export yet. Write a note first and the backup will have something to carry.
            </p>
          {/if}
        </div>

        <div class="col-span-12 md:col-span-7">
          <div
            class="transition-all duration-200 motion-reduce:transition-none {exportPanelIn
              ? 'translate-y-0 opacity-100'
              : 'translate-y-2 opacity-0'}"
          >
            {#if exportState === 'done' && lastExport}
              <div
                role="status"
                class="border-[3px] p-4"
                style="border-color: {brand.primaryColor}; background-color: {brand.backgroundColor};"
              >
                <p class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <Icon name="CheckCircle" class="h-4 w-4" aria-hidden="true" /> File saved
                </p>
                <p class="mt-2 break-all text-[13px] leading-relaxed" style="{mono}">{lastExport.filename}</p>
                <p class="mt-1 text-xs" style="color: {brand.neutralColor}; {mono}">
                  {lastExport.size} · {noteCount} notes · {itemCount} checklist items · {lastExport.at}
                </p>
              </div>
            {:else if exportState === 'blocked'}
              <div
                role="alert"
                class="border-[3px] p-4"
                style="border-color: {brand.primaryColor}; background-color: {brand.primaryColor}; color: {brand.backgroundColor};"
              >
                <p class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <Icon name="AlertCircle" class="h-4 w-4" aria-hidden="true" /> Download blocked
                </p>
                <p class="mt-2 max-w-[48ch] text-[13px] leading-relaxed">
                  This browser stopped the file from saving. Allow downloads for this page — or leave private mode — then
                  press Export again. Your notes were not touched.
                </p>
              </div>
            {:else if exportState === 'working'}
              <p class="text-xs leading-relaxed" style="color: {brand.neutralColor};">
                Gathering {noteCount} notes and {itemCount} checklist items…
              </p>
            {:else}
              <p class="max-w-[48ch] text-xs leading-relaxed" style="color: {brand.neutralColor};">
                No backup has been taken from this browser yet. The file never leaves your device — it saves straight to
                your downloads folder.
              </p>
            {/if}
          </div>
        </div>
      </div>
    </section>

    <!-- 02 / IMPORT ----------------------------------------------------- -->
    <section
      aria-labelledby="sec-import"
      class="mb-12 border-[3px] bg-white p-5 sm:p-8 md:mb-16"
      style="border-color: {brand.primaryColor}; box-shadow: 6px 6px 0 {brand.primaryColor};"
    >
      <div class="flex items-baseline gap-4 border-b-[3px] pb-4" style="border-color: {brand.primaryColor};">
        <span class="text-3xl leading-none md:text-4xl" style="font-family: {brand.fontHeading}; {mono}">02</span>
        <h2 id="sec-import" class="text-[12px] font-semibold uppercase tracking-[0.24em]">Import</h2>
      </div>

      <div class="mt-7 grid grid-cols-12 gap-x-6 gap-y-6">
        <div class="col-span-12 md:col-span-8">
          <Label
            for="backup-file"
            class="block text-[11px] font-semibold uppercase tracking-[0.18em]"
            style="color: {brand.neutralColor};"
          >
            Choose a previously exported file
          </Label>
          <input
            data-wf="b-3-0"
            id="backup-file"
            type="file"
            accept="application/json,.json"
            onchange={onFileChange}
            aria-describedby="backup-file-help"
            class="mt-3 block w-full border-[3px] bg-transparent px-3 py-[11px] text-[13px] file:mr-4 file:border-0 file:bg-transparent file:p-0 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.14em] focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px]"
            style="border-color: {brand.primaryColor}; color: {brand.primaryColor}; outline-color: {brand.accentColor};"
          />
          <p id="backup-file-help" class="mt-2 max-w-[56ch] text-xs leading-relaxed" style="color: {brand.neutralColor};">
            JSON files written by this app's export. The file is read here in your browser and its notes are added to the
            {noteCount} already stored.
          </p>
        </div>

        <div class="col-span-12 flex md:col-span-4 md:items-start md:pt-[26px]">
          <div class="relative w-full">
            <span
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px]"
              style="background-color: {brand.primaryColor};"
            ></span>
            <button
              data-wf="b-3-1"
              type="button"
              onclick={importNotes}
              disabled={importState === 'reading' || importState === 'done'}
              aria-busy={importState === 'reading'}
              class="{btn} {lift}"
              style="background-color: {brand.backgroundColor}; border-color: {brand.primaryColor}; color: {brand.primaryColor}; outline-color: {brand.accentColor};"
            >
              {#if importState === 'reading'}
                <span class="h-3 w-3 animate-pulse motion-reduce:animate-none" style="background-color: currentColor;"></span>
                Reading file…
              {:else}
                <Icon name="Upload" class="h-4 w-4" aria-hidden="true" />
                Import notes
              {/if}
            </button>
          </div>
        </div>
      </div>

      <div
        data-wf="b-4-0"
        class="mt-6 transition-all duration-200 motion-reduce:transition-none {importPanelIn
          ? 'translate-y-0 opacity-100'
          : 'translate-y-2 opacity-0'}"
      >
        {#if importState === 'invalid'}
          <div
            role="alert"
            class="border-[3px] p-4 sm:p-5"
            style="border-color: {brand.primaryColor}; background-color: {brand.primaryColor}; color: {brand.backgroundColor};"
          >
            <p class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
              <Icon name="AlertCircle" class="h-4 w-4" aria-hidden="true" /> Invalid file
            </p>
            <p class="mt-2 max-w-[62ch] text-[14px] leading-[1.6]">
              That file is not a valid Notes export. Nothing was imported and your existing notes are unchanged.
            </p>
            <p class="mt-3 break-all text-xs" style="{mono} opacity: 0.8;">
              Still selected: {chosenName || 'no file'} — pick another file and press Import notes again.
            </p>
          </div>
        {:else if importState === 'done'}
          <div
            role="status"
            class="border-[3px] p-4 sm:p-5"
            style="border-color: {brand.primaryColor}; background-color: {brand.backgroundColor};"
          >
            <p class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
              <Icon name="CheckCircle" class="h-4 w-4" aria-hidden="true" /> Imported
            </p>
            <p class="mt-2 text-[14px] leading-relaxed" style="{mono}">
              {importedCount} notes restored from {chosenName}. Opening your list…
            </p>
          </div>
        {:else if importState === 'reading'}
          <p class="text-xs leading-relaxed" style="color: {brand.neutralColor};">
            Reading {chosenName} on this device. Nothing is uploaded anywhere.
          </p>
        {:else if importState === 'nofile'}
          <p role="alert" class="flex items-start gap-2 text-xs leading-relaxed" style="color: {brand.primaryColor};">
            <Icon name="AlertCircle" class="mt-[1px] h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Choose a file first — no file was selected, so nothing was imported.</span>
          </p>
        {:else}
          <p class="max-w-[62ch] text-xs leading-relaxed" style="color: {brand.neutralColor};">
            {chosenName
              ? `Ready: ${chosenName}. Your ${noteCount} notes stay exactly as they are until you press Import notes.`
              : `Nothing has been imported. Your ${noteCount} notes stay exactly as they are until you choose a file.`}
          </p>
        {/if}
      </div>
    </section>

    <!-- 03 / ABOUT ------------------------------------------------------ -->
    <section aria-labelledby="b-5-0-heading" class="border-t-[3px] pt-8" style="border-color: {brand.primaryColor};">
      <div class="flex items-baseline gap-4">
        <span class="text-3xl leading-none md:text-4xl" style="font-family: {brand.fontHeading}; {mono}">03</span>
        <p class="text-[12px] font-semibold uppercase tracking-[0.24em]" style="color: {brand.neutralColor};">
          The small print
        </p>
      </div>

      <h2
        data-wf="b-5-0"
        id="b-5-0-heading"
        class="mt-4 text-[2rem] leading-tight md:text-5xl"
        style="font-family: {brand.fontHeading}; letter-spacing: -0.015em;"
      >
        About this app
      </h2>

      <p data-wf="b-6-0" class="mt-5 max-w-[64ch] text-[15px] leading-[1.7]">
        Your notes live only in this browser — no sync to other devices, no server, no login, no cost, no personal data
        collected. Clearing browser data erases them, so export a backup now and then.
      </p>

      <ul class="mt-8 grid grid-cols-1 border-t border-dashed sm:grid-cols-3" style="border-color: {brand.neutralColor}44;">
        <li
          class="border-b border-dashed py-4 pr-6 sm:border-b-0"
          style="border-color: {brand.neutralColor}44;"
        >
          <span class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Icon name="Check" class="h-4 w-4" aria-hidden="true" /> No account
          </span>
          <span class="mt-2 block text-xs leading-relaxed" style="color: {brand.neutralColor};">
            Open the page and write. Nothing to register, nothing to verify.
          </span>
        </li>
        <li
          class="border-b border-dashed py-4 sm:border-b-0 sm:border-l sm:px-6"
          style="border-color: {brand.neutralColor}44;"
        >
          <span class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Icon name="Check" class="h-4 w-4" aria-hidden="true" /> Free to use
          </span>
          <span class="mt-2 block text-xs leading-relaxed" style="color: {brand.neutralColor};">
            Every feature, no plans, no billing screen, no upsell.
          </span>
        </li>
        <li class="py-4 sm:border-l sm:pl-6" style="border-color: {brand.neutralColor}44;">
          <span class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Icon name="Check" class="h-4 w-4" aria-hidden="true" /> No data collected
          </span>
          <span class="mt-2 block text-xs leading-relaxed" style="color: {brand.neutralColor};">
            No trackers, no consent banner — there is nothing to consent to.
          </span>
        </li>
      </ul>

      <div class="mt-10 grid grid-cols-12">
        <div class="col-span-12 md:col-span-4">
          <button
            data-wf="b-7-0"
            type="button"
            onclick={() => navigate('notes')}
            class="inline-flex min-h-[44px] items-center gap-2 border-b-[3px] pb-1 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-150 hover:opacity-70 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[4px] motion-reduce:transition-none"
            style="border-color: {brand.accentColor}; color: {brand.primaryColor}; outline-color: {brand.accentColor};"
          >
            <Icon name="ArrowLeft" class="h-4 w-4" aria-hidden="true" />
            Back to notes
          </button>
        </div>
      </div>

      <p class="mt-10 text-[10px] uppercase tracking-[0.22em]" style="color: {brand.neutralColor}; {mono}">
        Stored in this browser · {noteCount} notes · {itemCount} checklist items · last checked {newestLabel}
      </p>
    </section>
  </div>
</div>

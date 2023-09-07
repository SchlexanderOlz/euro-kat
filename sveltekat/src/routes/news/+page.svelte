<script lang="ts">
</script>

<div class="w-full flex flex-col items-center mt-6 px-[10%] cursor-default">
	<h1 class="h1 mb-5 select-none">Berichte</h1>

	<!-- Berichte -->

	<!-- Beispiel 1 -->
	<div class="bericht w-full py-3 px-4">
		<h3 class="titel">Gnomburloni und die neuen und ganz neuen Blumentopfzwerge</h3>
		<p class="inhalt">
			Michael Koch (Lionel) hat sich sehr intensiv mit den Figuren der Serien "Die neuen
			Blumentopfzwerge" (1989) und "Die ganz neuen Blumentopfzwerge" (1990) oder besser mit der
			gemeinsamen Neuauflage dieser insgesamt 16 Figuren 1992 in Italien unter dem Namen
			"Gnomburloni" beschäftigt.
		</p>
		<p class="inhalt">
			Herausgekommen ist ein sehr interessanter Bericht der auch Anlass gibt sich mit dieser und
			anderen Serien aus dieser Zeit und ihren Unterscheiden neu zu beschäftigen.
		</p>
		<p class="inhalt">
			Der Bericht ist im Ü-Ei-Stammtisch veröffentlicht und hier ebenfalls von Michael Koch zur
			Verfügung gestellt worden. Angesehen von kleinen "redaktionellen Änderungen (im Text kursiv)"
			ist er im Original.
		</p>
		<a href="https://www.orf.at">
			<button class="referenz mt-2">- Link zu Bericht -</button>
		</a>
	</div>

	<!-- Beispiel 2 -->
	<div class="bericht w-full card py-3 px-4 dark:select-none">
		<h3 class="titel">Bermes Design</h3>
		<p class="inhalt">
			Peter Bermes (Bermes Design) gehörte, neben Koch, Havranek und kurzzeitig Roth, zu den Designer der Inhalte aus den deutschen Überraschungseiern der ersten Stunde. In 20 Jahren Arbeit für Ferrero (1975-1995) hat er unzählige Entwürfe gefertigt und zeichnet als Urheber zahlreicher Inhalte. Die von ihm entwickelten Spielprinzipien finden sich teilweise noch in aktuellen Inhalten wieder.
		</p>
		<p class="inhalt">
			Obwohl Ferrero langsam beginnt das eine oder andere Archiv zu öffnen, so bleibt doch noch vieles im Dunklen.
		</p>
		<p class="inhalt">
			.... es wird weiter dran gearbeitet!
		</p>
		<a href="https://www.orf.at">
			<button class="referenz">- zur Bermes Liste -</button>
		</a>
	</div>

    <!-- Restliche Berichte von Euro-Kat Berichte -->
    <p>Restliche Berichte hinzufügen</p>
</div>

<!-- Standard-Bericht Styles (nicht verändern, außer man weiß, was man tut!) -->
<style>
	.bericht {
		@apply card px-4 py-3 w-full mb-4;
	}

	.titel {
		@apply underline mb-1 text-2xl;
	}

	.inhalt {
		@apply mt-2;
	}

	.referenz {
		@apply mt-2 duration-150 underline;
	}
	.referenz:hover {
		@apply scale-105;
	}
</style>

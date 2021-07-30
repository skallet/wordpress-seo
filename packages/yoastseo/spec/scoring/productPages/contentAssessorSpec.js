import EnglishResearcher from "../../../src/languageProcessing/languages/en/Researcher";
import DefaultResearcher from "../../../src/languageProcessing/languages/_default/Researcher";
import ContentAssessor from "../../../src/scoring/productPages/contentAssessor.js";
import Factory from "../../specHelpers/factory.js";
import Paper from "../../../src/values/Paper.js";

const i18n = Factory.buildJed();

describe( "A product page content assessor", function() {
	describe( "Checks the applicable assessments for text containing less than 300 words", function() {
		it( "Should have 6 available assessments for a fully supported language", function() {
			const paper = new Paper( "Lorem ipsum dolor sit amet, voluptua probatus ullamcorper id vis, ceteros consetetur qui ea, " +
				"nam movet populo aliquam te. His eu debitis fastidii. Pri ea amet dicant. Ut his suas corpora, eu reformidans " +
				"signiferumque duo. At erant expetenda patrioque quo, rebum atqui nam ad, tempor elaboraret interpretaris pri ad. " +
				"Novum postea sea in. Placerat recteque cu usu. Cu nam sadipscing disputationi, sed labitur elaboraret et. Eu sed " +
				"accumsan prodesset. Posse integre et nec, usu assum audiam erroribus eu. Ei viris eirmod interesset usu, " +
				"usu homero liberavisse in, solet disputando ea vim. Mei eu inani nonumes consulatu, ea alterum menandri ius, " +
				"ne euismod neglegentur sed. Vis te deleniti suscipit, fabellas laboramus pri ei. Te quo aliquip offendit. " +
				"Vero paulo regione ei eum, sed at atqui meliore copiosae. Has et vocent vivendum. Mundi graeco latine cum ne, " +
				"no cum laoreet alienum. Quo cu vero utinam constituto. Vis omnium vivendum ea. Eum lorem ludus possim ut. Eu has eius " +
				"munere explicari, atqui ullamcorper eos no, harum epicuri per ut. Utamur volumus minimum ea vel, duo eu praesent " +
				"accommodare. Mutat gloriatur ex cum, rebum salutandi ei his, vis delenit quaestio ne. Iisque qualisque duo ei. " +
				"Splendide tincidunt te sit, commune oporteat quo id. Sumo recusabo suscipiantur duo an, no eum malis vulputate " +
				"consectetuer. Mel te noster invenire, nec ad vidisse constituto. Eos ut quod.", { locale: "en_US" } );
			const contentAssessor = new ContentAssessor( i18n, new EnglishResearcher( paper ) );

			contentAssessor.getPaper = function() {
				return paper;
			};
			const actual = contentAssessor.getApplicableAssessments().map( result => result.identifier );
			const expected = [
				"textParagraphTooLong",
				"textSentenceLength",
				"textTransitionWords",
				"passiveVoice",
				"textPresence",
				"listsPresence",
			];
			expect( actual ).toEqual( expected );
		} );

		it( "Should have 4 available assessments for a basic supported language", function() {
			const paper = new Paper( "test", { locale: "xx_XX" } );
			const contentAssessor = new ContentAssessor( i18n, new DefaultResearcher( paper ) );

			contentAssessor.getPaper = function() {
				return paper;
			};

			const actual = contentAssessor.getApplicableAssessments().map( result => result.identifier );
			const expected = [
				"textParagraphTooLong",
				"textSentenceLength",
				"textPresence",
				"listsPresence",
			];
			expect( actual ).toEqual( expected );
		} );
	} );

	describe( "Checks the applicable assessments for text containing more than 300 words", function() {
		it( "Should have 7 available assessments for a fully supported language", function() {
			const paper = new Paper( "beautiful cats ".repeat( 200 ), { locale: "en_US" } );
			const contentAssessor = new ContentAssessor( i18n, new EnglishResearcher( paper ) );

			contentAssessor.getPaper = function() {
				return paper;
			};
			const actual = contentAssessor.getApplicableAssessments().map( result => result.identifier );
			const expected = [
				"subheadingsTooLong",
				"textParagraphTooLong",
				"textSentenceLength",
				"textTransitionWords",
				"passiveVoice",
				"textPresence",
				"listsPresence",
			];
			expect( actual ).toEqual( expected );
		} );

		it( "Should have 5 available assessments for a basic supported language", function() {
			const paper = new Paper( "test ".repeat( 310 ), { locale: "xx_XX" } );
			const contentAssessor = new ContentAssessor( i18n, new DefaultResearcher( paper ) );

			contentAssessor.getPaper = function() {
				return paper;
			};

			const actual = contentAssessor.getApplicableAssessments().map( result => result.identifier );
			const expected = [
				"subheadingsTooLong",
				"textParagraphTooLong",
				"textSentenceLength",
				"textPresence",
				"listsPresence",
			];
			expect( actual ).toEqual( expected );
		} );
	} );
} );
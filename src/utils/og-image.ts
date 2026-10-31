import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// Cargar fuentes locales desde @fontsource una sola vez en el build
const fontPathInter600 = path.resolve(
	process.cwd(),
	'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff'
);
const fontPathInter400 = path.resolve(
	process.cwd(),
	'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff'
);
const fontPathJetBrains400 = path.resolve(
	process.cwd(),
	'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff'
);

const fontInter600 = fs.readFileSync(fontPathInter600);
const fontInter400 = fs.readFileSync(fontPathInter400);
const fontJetBrains400 = fs.readFileSync(fontPathJetBrains400);

export interface OgImageOptions {
	title?: string;
	category?: string;
	date?: string;
	isDefault?: boolean;
	lang?: 'es' | 'en';
}

function createBrandSvg(size = 72) {
	return {
		type: 'svg',
		props: {
			viewBox: '0 0 64 64',
			width: `${size}`,
			height: `${size}`,
			children: [
				{
					type: 'rect',
					props: {
						width: '64',
						height: '64',
						rx: '14',
						fill: '#17181a',
						stroke: '#26282b',
						strokeWidth: '1.5',
					},
				},
				{
					type: 'path',
					props: {
						d: 'M 16 26 L 24 32 L 16 38',
						fill: 'none',
						stroke: '#7d9bb8',
						strokeWidth: '7.5',
						strokeLinecap: 'square',
						strokeLinejoin: 'miter',
					},
				},
				{
					type: 'path',
					props: {
						d: 'M 44 24 v 16 c 0 4.5 -3.5 8 -8 8 c -1 0 -2.5 -0.5 -3.5 -1.2',
						fill: 'none',
						stroke: '#e6e6e3',
						strokeWidth: '7.5',
						strokeLinecap: 'round',
						strokeLinejoin: 'round',
					},
				},
				{
					type: 'circle',
					props: { cx: '44', cy: '14', r: '3.75', fill: '#e6e6e3' },
				},
			],
		},
	};
}

export async function generateOgImage(options: OgImageOptions): Promise<Uint8Array> {
	const { title = 'jrodriiguezg / blog', category, date, isDefault = false, lang = 'es' } = options;

	let contentChildren: any[];

	if (isDefault) {
		contentChildren = [
			{
				type: 'div',
				props: {
					style: {
						display: 'flex',
						flexDirection: 'column',
						gap: '32px',
					},
					children: [
						createBrandSvg(92),
						{
							type: 'div',
							props: {
								style: { display: 'flex', flexDirection: 'column', gap: '16px' },
								children: [
									{
										type: 'h1',
										props: {
											style: {
												fontSize: '68px',
												fontWeight: 600,
												color: '#e6e6e3',
												letterSpacing: '-0.025em',
												margin: 0,
												lineHeight: 1.1,
											},
											children: 'jrodriiguezg / blog',
										},
									},
									{
										type: 'p',
										props: {
											style: {
												fontSize: '26px',
												fontWeight: 400,
												color: '#8d9096',
												margin: 0,
												lineHeight: 1.4,
											},
											children:
												lang === 'en'
													? 'Systems, infrastructure, Linux and engineering notes.'
													: 'Sistemas, infraestructura, Linux y notas técnicas.',
										},
									},
								],
							},
						},
					],
				},
			},
			{
				type: 'div',
				props: {
					style: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderTop: '1px solid #26282b',
						paddingTop: '24px',
						fontFamily: 'JetBrains Mono',
						fontSize: '18px',
						color: '#8d9096',
					},
					children: [
						{
							type: 'div',
							props: {
								style: { display: 'flex', alignItems: 'center', gap: '10px' },
								children: [
									{
										type: 'div',
										props: {
											style: {
												width: '8px',
												height: '8px',
												borderRadius: '4px',
												backgroundColor: '#7d9bb8',
											},
										},
									},
									{ type: 'span', props: { children: 'blog.jrodriiguezg.link' } },
								],
							},
						},
						{
							type: 'div',
							props: {
								style: { color: '#8d9096', fontSize: '16px' },
								children: 'ES / EN',
							},
						},
					],
				},
			},
		];
	} else {
		// Ajuste dinámico de tamaño de fuente para garantizar máximo 3 líneas legibles
		const fontSize = title.length > 75 ? '52px' : title.length > 45 ? '60px' : '66px';

		contentChildren = [
			{
				type: 'div',
				props: {
					style: { display: 'flex', alignItems: 'center' },
					children: [createBrandSvg(72)],
				},
			},
			{
				type: 'div',
				props: {
					style: {
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						flex: 1,
						margin: '20px 0',
					},
					children: [
						{
							type: 'h1',
							props: {
								style: {
									fontSize,
									fontWeight: 600,
									lineHeight: 1.18,
									color: '#e6e6e3',
									letterSpacing: '-0.025em',
									margin: 0,
									display: '-webkit-box',
									WebkitLineClamp: 3,
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								},
								children: title,
							},
						},
					],
				},
			},
			{
				type: 'div',
				props: {
					style: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderTop: '1px solid #26282b',
						paddingTop: '24px',
						fontFamily: 'JetBrains Mono',
						fontSize: '17px',
						color: '#8d9096',
					},
					children: [
						{
							type: 'div',
							props: {
								style: { display: 'flex', alignItems: 'center', gap: '10px' },
								children: [
									{
										type: 'div',
										props: {
											style: {
												width: '8px',
												height: '8px',
												borderRadius: '4px',
												backgroundColor: '#7d9bb8',
											},
										},
									},
									{ type: 'span', props: { children: 'blog.jrodriiguezg.link' } },
								],
							},
						},
						{
							type: 'div',
							props: {
								style: { display: 'flex', gap: '14px', alignItems: 'center' },
								children: [
									category
										? {
												type: 'span',
												props: {
													style: { textTransform: 'uppercase', color: '#8d9096' },
													children: category,
												},
										  }
										: null,
									category && date
										? {
												type: 'span',
												props: { style: { color: '#57585a' }, children: '·' },
										  }
										: null,
									date
										? {
												type: 'span',
												props: { style: { color: '#8d9096' }, children: date },
										  }
										: null,
								].filter(Boolean),
							},
						},
					],
				},
			},
		];
	}

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '1200px',
					height: '630px',
					backgroundColor: '#111214',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '80px',
					color: '#e6e6e3',
					fontFamily: 'Inter',
				},
				children: contentChildren,
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Inter', data: fontInter600, weight: 600, style: 'normal' },
				{ name: 'Inter', data: fontInter400, weight: 400, style: 'normal' },
				{ name: 'JetBrains Mono', data: fontJetBrains400, weight: 400, style: 'normal' },
			],
		}
	);

	const resvg = await sharp(Buffer.from(svg)).png().toBuffer();
	return resvg;
}

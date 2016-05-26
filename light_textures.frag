vec2 rotate(float a, vec2 uv)
{
	return vec2(uv.x * cos(a) - uv.y * sin(a), uv.x * sin(a) + uv.y * cos(a));
}

float box(vec2 p, float size)
{
	p = abs(p) - size;
	return min(max(p.x, p.y), 0.0) + length(max(p, 0.0));
}

float disc(vec2 P, float size)
{
	return length(P) - size;
}

float gratelight1(vec2 uv)
{
	uv = fract(vec2(5.0, 10.0) * uv);    // divide into tiles
	uv = fract(uv + vec2(0.5, 0.5));	 // offset by half to wrap around tile borders
	uv = 2.0 * uv - 1.0;                 // remap to -1 .. 1 range
	uv.y *= 2.0;                         // make y axis thin

	return 1.0 - smoothstep(0.6, 0.8, box(uv.xy, 0.2));
}

float fanblade(vec2 uv)
{
	uv.x = 4.0 * uv.x - 3.0;             // remap into circle space
	uv.y = 2.0 * uv.y - 1.0;
	uv.y *= 10.0;                      // crush the y axis

	return smoothstep(0.4, 0.6, disc(uv, 0.1));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;

	//uv = fract(vec2(10.0, 10.0) * uv);    // tile along the y axis       
	//uv = fract(uv + vec2(0.5, 0.5));

	//uv.y *= 2.0;

	uv = 2.0 * uv - 1.0;
	float pion2 = 1.570796326 / 2.0;
	float f = fanblade(uv);
	f = fanblade(rotate(pion2, uv));
	//uv = rotate(pion2, uv);
	//f = box(uv, 0.2);
	fragColor = vec4(f * vec3(1, 1, 1), 1.0);

	//fragColor = vec4(fract(uv),0.5+0.5*sin(iGlobalTime),1.0);
}


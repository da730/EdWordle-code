/**
 * Created by Ps on 2016/9/28.
 */
var
    IBroadPhase                   =  Box2D.Collision.IBroadPhase,
    b2AABB                        =  Box2D.Collision.b2AABB,
    b2ContactID                   =  Box2D.Collision.b2ContactID,
    b2ContactPoint                =  Box2D.Collision.b2ContactPoint,
    b2DistanceInput               =  Box2D.Collision.b2DistanceInput,
    b2DistanceOutput              =  Box2D.Collision.b2DistanceOutput,
    b2DistanceProxy               =  Box2D.Collision.b2DistanceProxy,
    b2DynamicTree                 =  Box2D.Collision.b2DynamicTree,
    b2DynamicTreeBroadPhase       =  Box2D.Collision.b2DynamicTreeBroadPhase,
    b2Manifold                    =  Box2D.Collision.b2Manifold,
    b2ManifoldPoint               =  Box2D.Collision.b2ManifoldPoint,
    b2OBB                         =  Box2D.Collision.b2OBB,
    b2RayCastInput                =  Box2D.Collision.b2RayCastInput,
    b2RayCastOutput               =  Box2D.Collision.b2RayCastOutput,
    b2Segment                     =  Box2D.Collision.b2Segment,
    b2SimplexCache                =  Box2D.Collision.b2SimplexCache,
    b2TOIInput                    =  Box2D.Collision.b2TOIInput,
    b2WorldManifold               =  Box2D.Collision.b2WorldManifold,
    Features                      =  Box2D.Collision.Features,

    b2CircleShape                 =  Box2D.Collision.Shapes.b2CircleShape,
    b2EdgeChainDef                =  Box2D.Collision.Shapes.b2EdgeChainDef,
    b2MassData                    =  Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape                =  Box2D.Collision.Shapes.b2PolygonShape,
    b2Shape                       =  Box2D.Collision.Shapes.b2Shape,

    b2Color                       =  Box2D.Common.b2Color,
    b2Settings                    =  Box2D.Common.b2Settings,

    b2Mat22                       =  Box2D.Common.Math.b2Mat22,
    b2Mat33                       =  Box2D.Common.Math.b2Mat33,
    b2Sweep                       =  Box2D.Common.Math.b2Sweep,
    b2Transform                   =  Box2D.Common.Math.b2Transform,
    b2Vec2                        =  Box2D.Common.Math.b2Vec2,
    b2Vec3                        =  Box2D.Common.Math.b2Vec3,

    b2Body                        =  Box2D.Dynamics.b2Body,
    b2BodyDef                     =  Box2D.Dynamics.b2BodyDef,
    b2ContactFilter               =  Box2D.Dynamics.b2ContactFilter,
    b2ContactImpulse              =  Box2D.Dynamics.b2ContactImpulse,
    b2ContactListener             =  Box2D.Dynamics.b2ContactListener,
    b2DebugDraw                   =  Box2D.Dynamics.b2DebugDraw,
    b2DestructionListener         =  Box2D.Dynamics.b2DestructionListener,
    b2FilterData                  =  Box2D.Dynamics.b2FilterData,
    b2Fixture                     =  Box2D.Dynamics.b2Fixture,
    b2FixtureDef                  =  Box2D.Dynamics.b2FixtureDef,
    b2World                       =  Box2D.Dynamics.b2World,


    b2Contact                     =  Box2D.Dynamics.Contacts.b2Contact,
    b2ContactEdge                 =  Box2D.Dynamics.Contacts.b2ContactEdge,
    b2ContactResult               =  Box2D.Dynamics.Contacts.b2ContactResult,

    b2BuoyancyController          =  Box2D.Dynamics.Controllers.b2BuoyancyController,
    b2ConstantAccelController     =  Box2D.Dynamics.Controllers.b2ConstantAccelController,
    b2ConstantForceController     =  Box2D.Dynamics.Controllers.b2ConstantForceController,
    b2Controller                  =  Box2D.Dynamics.Controllers.b2Controller,
    b2ControllerEdge              =  Box2D.Dynamics.Controllers.b2ControllerEdge,
    b2GravityController           =  Box2D.Dynamics.Controllers.b2GravityController,
    b2TensorDampingController     =  Box2D.Dynamics.Controllers.b2TensorDampingController,

    b2DistanceJoint               =  Box2D.Dynamics.Joints.b2DistanceJoint,
    b2DistanceJointDef            =  Box2D.Dynamics.Joints.b2DistanceJointDef,
    b2FrictionJoint               =  Box2D.Dynamics.Joints.b2FrictionJoint,
    b2FrictionJointDef            =  Box2D.Dynamics.Joints.b2FrictionJointDef,
    b2GearJoint                   =  Box2D.Dynamics.Joints.b2GearJoint,
    b2GearJointDef                =  Box2D.Dynamics.Joints.b2GearJointDef,
    b2Joint                       =  Box2D.Dynamics.Joints.b2Joint,
    b2JointDef                    =  Box2D.Dynamics.Joints.b2JointDef,
    b2JointEdge                   =  Box2D.Dynamics.Joints.b2JointEdge,
    b2LineJoint                   =  Box2D.Dynamics.Joints.b2LineJoint,
    b2LineJointDef                =  Box2D.Dynamics.Joints.b2LineJointDef,
    b2MouseJoint                  =  Box2D.Dynamics.Joints.b2MouseJoint,
    b2MouseJointDef               =  Box2D.Dynamics.Joints.b2MouseJointDef,
    b2PrismaticJoint              =  Box2D.Dynamics.Joints.b2PrismaticJoint,
    b2PrismaticJointDef           =  Box2D.Dynamics.Joints.b2PrismaticJointDef,
    b2PulleyJoint                 =  Box2D.Dynamics.Joints.b2PulleyJoint,
    b2PulleyJointDef              =  Box2D.Dynamics.Joints.b2PulleyJointDef,
    b2RevoluteJoint               =  Box2D.Dynamics.Joints.b2RevoluteJoint,
    b2RevoluteJointDef            =  Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2WeldJoint                   =  Box2D.Dynamics.Joints.b2WeldJoint,
    b2WeldJointDef                =  Box2D.Dynamics.Joints.b2WeldJointDef
    ;